import { createContext, useState, useEffect } from 'react';
import { initWebSocket, addEventListener, getActiveAuctions } from '../services/auctionService';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [viewerCounts, setViewerCounts] = useState({});
  const [bidHistories, setBidHistories] = useState({});
  const [hotAuctions, setHotAuctions] = useState([]);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = initWebSocket();

    // Clean up on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  // Set up WebSocket event listeners
  useEffect(() => {
    // Connection status listener
    const connectionListener = addEventListener('connection', (data) => {
      setSocketConnected(data.connected);
    });

    // Auction update listener
    const updateListener = addEventListener('auction_update', (data) => {
      setActiveAuctions(prevAuctions => {
        return prevAuctions.map(auction =>
          auction._id === data.auction.id
            ? {
                ...auction,
                currentPrice: data.auction.currentPrice,
                bids: data.auction.bids,
                status: data.auction.status
              }
            : auction
        );
      });

      // Update bid history for this auction
      if (data.auction.newBid) {
        setBidHistories(prev => ({
          ...prev,
          [data.auction.id]: [
            ...(prev[data.auction.id] || []),
            {
              id: uuidv4(),
              amount: data.auction.newBid.amount,
              bidder: data.auction.newBid.bidder,
              timestamp: new Date()
            }
          ]
        }));

        // Check if this auction should be marked as "hot"
        const bidCount = (bidHistories[data.auction.id] || []).length;
        if (bidCount >= 5) {
          setHotAuctions(prev =>
            prev.includes(data.auction.id) ? prev : [...prev, data.auction.id]
          );
        }
      }
    });

    // Viewer count update listener
    const viewerCountListener = addEventListener('viewer_count_update', (data) => {
      setViewerCounts(prev => ({
        ...prev,
        [data.auctionId]: data.count
      }));
    });

    // Outbid notification listener
    const outbidListener = addEventListener('outbid_notification', (data) => {
      generateNotification('outbid', data.message, data.auctionId);
    });

    // Auction ending soon notification
    const auctionEndingListener = addEventListener('auction_ending_soon', (data) => {
      const message = `${data.auctionName} is ending in ${data.timeLeft}!`;
      generateNotification('auction_ending', message, data.auctionId);
    });

    // Auction won notification
    const auctionWonListener = addEventListener('auction_won', (data) => {
      const message = `Congratulations! You won the auction for ${data.auctionName}!`;
      generateNotification('auction_won', message, data.auctionId);
    });

    // Clean up listeners on unmount
    return () => {
      connectionListener();
      updateListener();
      outbidListener();
      viewerCountListener();
      auctionEndingListener();
      auctionWonListener();
    };
  }, [bidHistories]);

  // Fetch active auctions
  useEffect(() => {
    const fetchActiveAuctions = async () => {
      try {
        setLoading(true);
        const auctions = await getActiveAuctions();
        setActiveAuctions(auctions || []);
      } catch (error) {
        console.error('Error fetching active auctions:', error);
        toast.error('Failed to load auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveAuctions();

    // Refresh active auctions every 30 seconds
    const interval = setInterval(fetchActiveAuctions, 30000);

    return () => clearInterval(interval);
  }, []);

  // Remove a notification
  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Add to watchlist
  const addToWatchlist = (auctionId) => {
    if (!watchlist.includes(auctionId)) {
      setWatchlist(prev => [...prev, auctionId]);

      // Add notification
      const auction = activeAuctions.find(a => a._id === auctionId);
      if (auction) {
        const message = `${auction.product.pName} added to your watchlist`;
        generateNotification('watchlist_add', message, auctionId);
      }
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = (auctionId) => {
    setWatchlist(prev => prev.filter(id => id !== auctionId));
  };

  // Get bid history for an auction
  const getBidHistory = (auctionId) => {
    return bidHistories[auctionId] || [];
  };

  // Check if an auction is "hot" (high bidding activity)
  const isHotAuction = (auctionId) => {
    return hotAuctions.includes(auctionId);
  };

  // Get viewer count for an auction
  const getViewerCount = (auctionId) => {
    return viewerCounts[auctionId] || 0;
  };

  // Generate a notification for real events
  const generateNotification = (type, message, auctionId) => {
    const notification = {
      id: uuidv4(),
      type,
      message,
      auctionId,
      timestamp: new Date()
    };

    setNotifications(prev => [notification, ...prev]);

    // Show toast notification with appropriate icon
    const icon = type === 'outbid' ? '💰' :
                 type === 'auction_ending' ? '⏰' :
                 type === 'auction_won' ? '🏆' :
                 type === 'watchlist_add' ? '❤️' : '🔔';

    toast(message, {
      icon,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: type === 'auction_won' ? 6000 : 4000,
    });
  };

  return (
    <AuctionContext.Provider
      value={{
        activeAuctions,
        loading,
        socketConnected,
        notifications,
        removeNotification,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        getBidHistory,
        isHotAuction,
        getViewerCount,
        generateNotification
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;
