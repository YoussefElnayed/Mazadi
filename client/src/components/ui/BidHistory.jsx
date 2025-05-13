import { motion } from 'framer-motion';
import { FiUser, FiClock, FiDollarSign } from 'react-icons/fi';

const BidHistory = ({ bids, currentUserId }) => {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // If no bids yet
  if (!bids || bids.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
        No bids have been placed yet. Be the first to bid!
      </div>
    );
  }

  // Sort bids by timestamp (newest first)
  const sortedBids = [...bids].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {sortedBids.map((bid, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`p-3 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between ${
            bid.user._id === currentUserId
              ? 'bg-primary-50 border border-primary-200'
              : 'bg-gray-50'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              bid.user._id === currentUserId ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-600'
            }`}>
              <FiUser />
            </div>
            <div className="ml-3">
              <div className="font-medium flex flex-wrap items-center">
                <span className="mr-2">{bid.user._id === currentUserId ? 'You' : bid.user.name}</span>
                {index === 0 && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Highest
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <FiClock className="mr-1" />
                {formatDate(bid.timestamp)}
              </div>
            </div>
          </div>
          <div className="font-bold text-lg flex items-center mt-2 sm:mt-0">
            <FiDollarSign className="text-sm" />
            {bid.amount.toFixed(2)}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BidHistory;
