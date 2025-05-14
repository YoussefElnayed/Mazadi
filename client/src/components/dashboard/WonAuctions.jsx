import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiDollarSign, FiCalendar, FiPackage } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import { getUserWonAuctions } from '../../services/auctionService';

const WonAuctions = () => {
  const { user } = useContext(AuthContext);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWonAuctions = async () => {
      try {
        setLoading(true);
        // This would be replaced with a real API call in a production app
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          // Mock data for demonstration
          const mockWonAuctions = [
            {
              _id: '1',
              auctionId: '101',
              productName: 'Sony PlayStation 5',
              productImage: 'default.jpg',
              winningBid: 499.99,
              endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
              paymentStatus: 'paid',
              shippingStatus: 'shipped'
            },
            {
              _id: '2',
              auctionId: '102',
              productName: 'Apple AirPods Pro',
              productImage: 'default.jpg',
              winningBid: 179.99,
              endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
              paymentStatus: 'paid',
              shippingStatus: 'delivered'
            }
          ];
          setWonAuctions(mockWonAuctions);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching won auctions:', error);
        setLoading(false);
      }
    };

    fetchWonAuctions();
  }, [user?._id]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Won Auctions</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Won Auctions</h2>

      {wonAuctions.length > 0 ? (
        <div className="space-y-4">
          {wonAuctions.map((auction) => (
            <motion.div
              key={auction._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                    <img
                      src={`/uploads/products/${auction.productImage}`}
                      alt={auction.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{auction.productName}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiCalendar className="mr-1" />
                      <span>Won on {formatDate(auction.endTime)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col items-end">
                  <div className="text-lg font-bold">${auction.winningBid.toFixed(2)}</div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    <FiAward className="inline mr-1" />
                    Won
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center border-t border-gray-100 pt-3">
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(auction.paymentStatus)}`}>
                    <FiDollarSign className="inline mr-1" />
                    {auction.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(auction.shippingStatus)}`}>
                    <FiPackage className="inline mr-1" />
                    {auction.shippingStatus.charAt(0).toUpperCase() + auction.shippingStatus.slice(1)}
                  </span>
                </div>
                <Link to={`/auctions/${auction.auctionId}`}>
                  <Button size="sm" variant="outline">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FiAward className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No won auctions yet</h3>
          <p className="text-gray-500 mb-4">You haven't won any auctions yet.</p>
          <Link to="/auctions" className="btn btn-primary">
            Browse Auctions
          </Link>
        </div>
      )}
    </div>
  );
};

export default WonAuctions;
