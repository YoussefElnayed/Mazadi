import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiClock, FiDollarSign, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const BidHistory = ({ bids, currentUserId }) => {
  const [sortedBids, setSortedBids] = useState([]);
  const [sortBy, setSortBy] = useState('time'); // time, amount
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [newBidId, setNewBidId] = useState(null);

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

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    return formatDate(dateString);
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

  // Sort bids when props change or sort options change
  useEffect(() => {
    if (!bids || bids.length === 0) {
      setSortedBids([]);
      return;
    }

    // Check for new bids
    if (sortedBids.length > 0 && bids.length > sortedBids.length) {
      // Find the new bid by comparing arrays
      const newBid = bids.find(bid =>
        !sortedBids.some(existingBid =>
          existingBid.timestamp === bid.timestamp &&
          existingBid.amount === bid.amount &&
          existingBid.user._id === bid.user._id
        )
      );

      if (newBid) {
        // Use a unique identifier for the new bid
        setNewBidId(`${newBid.user._id}-${newBid.amount}-${new Date(newBid.timestamp).getTime()}`);

        // Clear the highlight after 3 seconds
        setTimeout(() => setNewBidId(null), 3000);
      }
    }

    // Sort the bids based on current sort options
    const sorted = [...bids].sort((a, b) => {
      if (sortBy === 'time') {
        return sortOrder === 'asc'
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      } else { // sort by amount
        return sortOrder === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

    setSortedBids(sorted);
  }, [bids, sortBy, sortOrder]);

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
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

  return (
    <div>
      {/* Sort Controls */}
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2 text-sm">
          <button
            onClick={() => toggleSort('time')}
            className={`flex items-center px-3 py-1 rounded-full ${
              sortBy === 'time' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <FiClock className="mr-1" />
            Time
            {sortBy === 'time' && (
              sortOrder === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
            )}
          </button>
          <button
            onClick={() => toggleSort('amount')}
            className={`flex items-center px-3 py-1 rounded-full ${
              sortBy === 'amount' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <FiDollarSign className="mr-1" />
            Amount
            {sortBy === 'amount' && (
              sortOrder === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />
            )}
          </button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <AnimatePresence>
          {sortedBids.map((bid, index) => {
            // Create a unique key for the bid
            const bidKey = `${bid.user._id}-${bid.amount}-${new Date(bid.timestamp).getTime()}`;
            const isHighestBid = index === 0 && sortBy === 'time' && sortOrder === 'desc';
            const isNewBid = bidKey === newBidId;

            return (
              <motion.div
                key={bidKey}
                variants={itemVariants}
                initial={isNewBid ? { opacity: 0, y: -20, backgroundColor: '#f0fff4' } : "hidden"}
                animate={isNewBid ? { opacity: 1, y: 0, backgroundColor: '#f0fff4' } : "visible"}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between ${
                  isNewBid
                    ? 'bg-green-50 border border-green-200'
                    : bid.user._id === currentUserId
                      ? 'bg-primary-50 border border-primary-200'
                      : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isNewBid
                      ? 'bg-green-100 text-green-600'
                      : bid.user._id === currentUserId
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    <FiUser />
                  </div>
                  <div className="ml-3">
                    <div className="font-medium flex flex-wrap items-center">
                      <span className="mr-2">{bid.user._id === currentUserId ? 'You' : bid.user.name}</span>
                      {isHighestBid && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Highest
                        </span>
                      )}
                      {isNewBid && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-1 animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <FiClock className="mr-1" />
                      {formatTimeAgo(bid.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-lg flex items-center mt-2 sm:mt-0">
                  <FiDollarSign className="text-sm" />
                  {bid.amount.toFixed(2)}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BidHistory;
