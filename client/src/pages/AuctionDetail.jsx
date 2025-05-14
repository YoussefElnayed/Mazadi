import { useState, useEffect, useContext, lazy, Suspense, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiClock, FiUser, FiTag, FiInfo, FiHeart, FiEye, FiActivity, FiBarChart2 } from 'react-icons/fi';
import { getAuctionById, subscribeToAuction, addEventListener } from '../services/auctionService';
import { AuthContext } from '../context/AuthContext';
import { AuctionContext } from '../context/AuctionContext';
import Button from '../components/ui/Button';
import LazyImage from '../components/ui/LazyImage';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Lazy loaded components
const AuctionTimer = lazy(() => import('../components/ui/AuctionTimer'));
const BidHistory = lazy(() => import('../components/ui/BidHistory'));
const BidForm = lazy(() => import('../components/ui/BidForm'));

const AuctionDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useContext(AuthContext);
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    getBidHistory,
    isHotAuction,
    getViewerCount
  } = useContext(AuctionContext);

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showBidAnimation, setShowBidAnimation] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [bidChartData, setBidChartData] = useState(null);

  // Refs for animations
  const bidAnimationRef = useRef(null);

  // Fetch auction data
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        setLoading(true);
        const data = await getAuctionById(id);
        setAuction(data);

        // Subscribe to real-time updates for this auction
        subscribeToAuction(id);
      } catch (error) {
        console.error('Error fetching auction:', error);
        toast.error('Failed to load auction details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuction();
    }
  }, [id]);

  // Check if auction is in watchlist
  useEffect(() => {
    setIsWatchlisted(watchlist.includes(id));
  }, [watchlist, id]);

  // Update viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(getViewerCount(id));
    }, 5000);

    return () => clearInterval(interval);
  }, [id, getViewerCount]);

  // Generate bid chart data
  useEffect(() => {
    if (auction && auction.bids && auction.bids.length > 0) {
      const bidHistory = [...auction.bids].sort((a, b) =>
        new Date(a.timestamp) - new Date(b.timestamp)
      );

      const labels = bidHistory.map(bid => {
        const date = new Date(bid.timestamp);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      });

      const data = bidHistory.map(bid => bid.amount);

      setBidChartData({
        labels,
        datasets: [
          {
            label: 'Bid Price ($)',
            data,
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            tension: 0.2
          }
        ]
      });
    }
  }, [auction]);

  // Listen for real-time auction updates
  useEffect(() => {
    const removeListener = addEventListener('auction_update', (data) => {
      if (data.auction.id === id) {
        setAuction(prevAuction => {
          if (!prevAuction) return prevAuction;

          // Show bid animation when price changes
          if (prevAuction.currentPrice !== data.auction.currentPrice) {
            setShowBidAnimation(true);
            setTimeout(() => setShowBidAnimation(false), 2000);
          }

          return {
            ...prevAuction,
            currentPrice: data.auction.currentPrice,
            bids: data.auction.bids.map(bid => ({
              user: { name: bid.user },
              amount: bid.amount,
              timestamp: bid.timestamp
            })),
            status: data.auction.status
          };
        });
      }
    });

    // Listen for viewer count updates
    const viewerListener = addEventListener('viewer_count_update', (data) => {
      if (data.auctionId === id) {
        setViewerCount(data.count);
      }
    });

    return () => {
      removeListener();
      viewerListener();
    };
  }, [id]);

  // Handle auction end
  const handleAuctionEnd = () => {
    setAuction(prev => ({
      ...prev,
      status: 'ended'
    }));

    toast('This auction has ended', {
      icon: '🏁',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Handle bid placed
  const handleBidPlaced = () => {
    // Refresh auction data
    getAuctionById(id)
      .then(data => setAuction(data))
      .catch(error => console.error('Error refreshing auction data:', error));

    // Show bid animation
    setShowBidAnimation(true);
    setTimeout(() => setShowBidAnimation(false), 2000);
  };

  // Toggle watchlist
  const toggleWatchlist = () => {
    if (isWatchlisted) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" color="primary" />
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Auction Not Found</h2>
        <p className="mb-4">The auction you're looking for doesn't exist or has been removed.</p>
        <Link to="/auctions">
          <Button>Back to Auctions</Button>
        </Link>
      </div>
    );
  }

  const isActive = auction.status === 'active';
  const isEnded = auction.status === 'ended' || auction.status === 'cancelled';

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/auctions" className="text-primary-600 hover:text-primary-700 flex items-center">
              <FiArrowLeft className="mr-2" />
              Back to Auctions
            </Link>
          </div>

          {/* Auction Status Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isActive
                ? 'bg-green-100 text-green-800'
                : isEnded
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
            }`}>
              <FiClock className="mr-1" />
              {isActive ? 'Active' : isEnded ? 'Ended' : 'Upcoming'}
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-6">
              {/* Product Images */}
              <div>
                <motion.div
                  className="mb-4 rounded-lg overflow-hidden bg-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <LazyImage
                    src={`/uploads/products/${auction.product.pImages[selectedImage]}`}
                    alt={auction.product.pName}
                    className="w-full h-64 md:h-96 object-contain"
                    aspectRatio="4/3"
                  />
                </motion.div>

                <div className="grid grid-cols-5 gap-1 md:gap-2">
                  {auction.product.pImages.map((image, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary-500' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <LazyImage
                        src={`/uploads/products/${image}`}
                        alt={`${auction.product.pName} - Image ${index + 1}`}
                        className="w-full h-12 md:h-20 object-cover"
                        aspectRatio="1/1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Auction Info */}
              <div>
                <motion.h1
                  className="text-3xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {auction.product.pName}
                </motion.h1>

                {/* Current Price with Animation */}
                <div className="mb-4 relative">
                  <div className="text-sm text-gray-500">Current Bid</div>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold text-primary-600">
                      ${auction.currentPrice.toFixed(2)}
                    </div>

                    {/* Bid Animation */}
                    <AnimatePresence>
                      {showBidAnimation && (
                        <motion.div
                          ref={bidAnimationRef}
                          initial={{ opacity: 0, scale: 0.5, x: -20 }}
                          animate={{ opacity: 1, scale: 1, x: 10 }}
                          exit={{ opacity: 0, scale: 0.5, y: -20 }}
                          className="ml-2 text-green-500 font-medium"
                        >
                          <div className="flex items-center">
                            <FiActivity className="mr-1" />
                            <span>New Bid!</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-sm text-gray-500">
                    Starting Price: ${auction.startingPrice.toFixed(2)}
                  </div>

                  {/* Real-time Stats */}
                  <div className="flex items-center mt-2 text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <FiEye className="mr-1" />
                      <span>{viewerCount} watching now</span>
                    </div>
                    <div className="flex items-center">
                      <FiUser className="mr-1" />
                      <span>{auction.bids?.length || 0} bids</span>
                    </div>
                    {isHotAuction(id) && (
                      <div className="flex items-center text-red-500 animate-pulse">
                        <FiActivity className="mr-1" />
                        <span>Hot</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Watchlist Button */}
                {isAuthenticated && (
                  <div className="mb-4">
                    <button
                      onClick={toggleWatchlist}
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isWatchlisted
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FiHeart className={`mr-2 ${isWatchlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </button>
                  </div>
                )}

                {/* Auction Timer */}
                {!isEnded && (
                  <Suspense fallback={<div className="h-32 flex items-center justify-center">
                    <LoadingSpinner size="md" />
                  </div>}>
                    <AuctionTimer
                      endTime={auction.endTime}
                      onEnd={handleAuctionEnd}
                    />
                  </Suspense>
                )}

                {/* Bid Form */}
                {isAuthenticated ? (
                  <Suspense fallback={<div className="h-48 flex items-center justify-center">
                    <LoadingSpinner size="md" />
                  </div>}>
                    <BidForm
                      auction={auction}
                      userId={user._id}
                      onBidPlaced={handleBidPlaced}
                      disabled={!isActive}
                    />
                  </Suspense>
                ) : (
                  <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p className="text-gray-700 mb-3">You need to be logged in to place a bid</p>
                    <Link to="/login">
                      <Button>Login to Bid</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex border-b overflow-x-auto">
                <button
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'details'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'bids'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('bids')}
                >
                  Bid History ({auction.bids?.length || 0})
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'chart'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('chart')}
                >
                  <div className="flex items-center">
                    <FiBarChart2 className="mr-1" />
                    Price Trend
                  </div>
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'details' ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{auction.product.pDescription}</p>
                  </div>
                ) : activeTab === 'bids' ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Bid History</h3>
                    <Suspense fallback={<div className="h-64 flex items-center justify-center">
                      <LoadingSpinner size="md" />
                    </div>}>
                      <BidHistory bids={auction.bids} currentUserId={user?._id} />
                    </Suspense>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Price Trend</h3>
                    {bidChartData && auction.bids && auction.bids.length > 0 ? (
                      <div className="h-64">
                        <Line
                          data={bidChartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'top',
                              },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    return `$${context.raw}`;
                                  }
                                }
                              }
                            },
                            scales: {
                              y: {
                                ticks: {
                                  callback: function(value) {
                                    return '$' + value;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <FiBarChart2 className="mx-auto h-12 w-12 mb-4" />
                        <p>Not enough bid data to display a chart.</p>
                        <p className="text-sm">Charts will appear after multiple bids have been placed.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
