import { createContext, useState, useEffect } from 'react';
import { initWebSocket, addEventListener, getActiveAuctions } from '../services/auctionService';
import toast from 'react-hot-toast';

export const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

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
    });
    
    // Outbid notification listener
    const outbidListener = addEventListener('outbid_notification', (data) => {
      // Add notification
      const notification = {
        id: Date.now(),
        type: 'outbid',
        message: data.message,
        auctionId: data.auctionId,
        timestamp: new Date()
      };
      
      setNotifications(prev => [notification, ...prev]);
      
      // Show toast notification
      toast(data.message, {
        icon: '🔔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    });
    
    // Clean up listeners on unmount
    return () => {
      connectionListener();
      updateListener();
      outbidListener();
    };
  }, []);

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

  return (
    <AuctionContext.Provider
      value={{
        activeAuctions,
        loading,
        socketConnected,
        notifications,
        removeNotification
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;
