import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiClock, FiDollarSign, FiEye, FiTrash2, FiUsers } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import { getUserWatchlist, removeFromWatchlist } from '../../services/auctionService';

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        // This would be replaced with a real API call in a production app
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          // Mock data for demonstration
          const mockWatchlist = [
            {
              _id: '1',
              auctionId: '101',
              productName: 'Dell XPS 15 Laptop',
              productImage: 'default.jpg',
              currentPrice: 1299.99,
              startingPrice: 999.99,
              endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
              bidCount: 12,
              status: 'active',
              viewerCount: 24
            },
            {
              _id: '2',
              auctionId: '102',
              productName: 'Canon EOS R5 Camera',
              productImage: 'default.jpg',
              currentPrice: 3499.99,
              startingPrice: 2999.99,
              endTime: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
              bidCount: 8,
              status: 'active',
              viewerCount: 15
            },
            {
              _id: '3',
              auctionId: '103',
              productName: 'Bose QuietComfort Earbuds',
              productImage: 'default.jpg',
              currentPrice: 199.99,
              startingPrice: 149.99,
              endTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
              bidCount: 5,
              status: 'active',
              viewerCount: 9
            }
          ];
          setWatchlist(mockWatchlist);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user?._id]);

  // Get time left until auction ends
  const getTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end - now;

    if (difference <= 0) return 'Ended';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  // Get urgency class based on time left
  const getUrgencyClass = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end - now;

    if (difference <= 0) return 'text-red-500';
    if (difference <= 1000 * 60 * 60 * 2) return 'text-red-500 animate-pulse'; // Less than 2 hours
    if (difference <= 1000 * 60 * 60 * 24) return 'text-orange-500'; // Less than 1 day
    return 'text-green-500';
  };

  // Handle remove from watchlist
  const handleRemoveFromWatchlist = (id) => {
    // In a real app, this would call an API
    setWatchlist(watchlist.filter(item => item._id !== id));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>

      {watchlist.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {watchlist.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <img
                        src={`/uploads/products/${item.productImage}`}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.productName}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <FiUsers className="mr-1" />
                        <span>{item.bidCount} bids</span>
                        <span className="mx-2">•</span>
                        <FiEye className="mr-1" />
                        <span>{item.viewerCount} watching</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex flex-col items-end">
                    <div className="text-lg font-bold">${item.currentPrice.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">
                      Starting: ${item.startingPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center border-t border-gray-100 pt-3">
                  <div className={`flex items-center text-sm ${getUrgencyClass(item.endTime)}`}>
                    <FiClock className="mr-1" />
                    <span>{getTimeLeft(item.endTime)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRemoveFromWatchlist(item._id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove from watchlist"
                    >
                      <FiTrash2 />
                    </button>
                    <Link to={`/auctions/${item.auctionId}`}>
                      <Button size="sm" variant="outline">View Auction</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-8">
          <FiHeart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
          <p className="text-gray-500 mb-4">Save auctions you're interested in to keep track of them.</p>
          <Link to="/auctions" className="btn btn-primary">
            Browse Auctions
          </Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
