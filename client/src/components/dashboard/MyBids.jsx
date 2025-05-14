import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiArrowUp, FiArrowDown, FiPackage } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import { getUserBids } from '../../services/auctionService';

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date'); // date, price, status
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        // This would be replaced with a real API call in a production app
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          // Mock data for demonstration
          const mockBids = [
            {
              _id: '1',
              auctionId: '101',
              productName: 'iPhone 13 Pro',
              productImage: 'default.jpg',
              amount: 850,
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
              isHighestBid: true,
              auctionStatus: 'active',
              auctionEndTime: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day from now
            },
            {
              _id: '2',
              auctionId: '102',
              productName: 'Samsung Galaxy S22',
              productImage: 'default.jpg',
              amount: 720,
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
              isHighestBid: false,
              auctionStatus: 'active',
              auctionEndTime: new Date(Date.now() + 1000 * 60 * 60 * 48) // 2 days from now
            },
            {
              _id: '3',
              auctionId: '103',
              productName: 'MacBook Pro M1',
              productImage: 'default.jpg',
              amount: 1200,
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
              isHighestBid: false,
              auctionStatus: 'ended',
              auctionEndTime: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
            }
          ];
          setBids(mockBids);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching bids:', error);
        setLoading(false);
      }
    };

    fetchBids();
  }, [user?._id]);

  // Sort bids based on current sort settings
  const sortedBids = [...bids].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === 'status') {
      // Sort by auction status (active first, then ended)
      if (a.auctionStatus === b.auctionStatus) {
        return sortOrder === 'asc'
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      }
      return sortOrder === 'asc'
        ? a.auctionStatus.localeCompare(b.auctionStatus)
        : b.auctionStatus.localeCompare(a.auctionStatus);
    }
    return 0;
  });

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Bids</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Bids</h2>

      {bids.length > 0 ? (
        <>
          {/* Sort Controls */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => toggleSort('date')}
              className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                sortBy === 'date' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              Date
              {sortBy === 'date' && (
                sortOrder === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
              )}
            </button>
            <button
              onClick={() => toggleSort('price')}
              className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                sortBy === 'price' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              Price
              {sortBy === 'price' && (
                sortOrder === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
              )}
            </button>
            <button
              onClick={() => toggleSort('status')}
              className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                sortBy === 'status' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              Status
              {sortBy === 'status' && (
                sortOrder === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
              )}
            </button>
          </div>

          {/* Bids List */}
          <div className="space-y-4">
            {sortedBids.map((bid) => (
              <motion.div
                key={bid._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <img
                        src={`/uploads/products/${bid.productImage}`}
                        alt={bid.productName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{bid.productName}</h3>
                      <p className="text-xs text-gray-500">Bid placed on {formatDate(bid.timestamp)}</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex flex-col items-end">
                    <div className="text-lg font-bold">${bid.amount.toFixed(2)}</div>
                    {bid.isHighestBid ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Highest Bid
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                        Outbid
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center border-t border-gray-100 pt-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    <span>
                      {bid.auctionStatus === 'active'
                        ? getTimeLeft(bid.auctionEndTime)
                        : 'Auction ended'}
                    </span>
                  </div>
                  <Link to={`/auctions/${bid.auctionId}`}>
                    <Button size="sm" variant="outline">View Auction</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <FiDollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bids yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any bids yet.</p>
          <Link to="/auctions" className="btn btn-primary">
            Browse Auctions
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBids;
