import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiX, FiClock, FiDollarSign, FiAlertCircle, FiHeart } from 'react-icons/fi';
import { AuctionContext } from '../../context/AuctionContext';

// CSS for the pulse animation
const pulseAnimation = {
  '0%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.7)' },
  '70%': { boxShadow: '0 0 0 10px rgba(220, 38, 38, 0)' },
  '100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0)' }
};

const NotificationCenter = () => {
  const { notifications, removeNotification } = useContext(AuctionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  // Store read notifications in local storage
  const [readNotifications, setReadNotifications] = useState(() => {
    const saved = localStorage.getItem('readNotifications');
    return saved ? JSON.parse(saved) : [];
  });

  // Update unread count when notifications change
  useEffect(() => {
    const unread = notifications.filter(n => !readNotifications.includes(n.id)).length;
    setUnreadCount(unread);
  }, [notifications, readNotifications]);

  // Save read notifications to local storage
  useEffect(() => {
    localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
  }, [readNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format notification time
  const formatTime = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now - notifTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'outbid':
        return <FiDollarSign className="text-red-500" />;
      case 'auction_ending':
        return <FiClock className="text-orange-500" />;
      case 'auction_won':
        return <FiDollarSign className="text-green-500" />;
      case 'watchlist_add':
        return <FiHeart className="text-pink-500" />;
      case 'price_drop':
        return <FiDollarSign className="text-blue-500" />;
      case 'new_auction':
        return <FiAlertCircle className="text-purple-500" />;
      default:
        return <FiAlertCircle className="text-blue-500" />;
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read
    if (!readNotifications.includes(notification.id)) {
      setReadNotifications(prev => [...prev, notification.id]);
    }
    setIsOpen(false);
  };

  // Mark all as read
  const markAllAsRead = () => {
    const ids = notifications.map(n => n.id);
    setReadNotifications(prev => [...prev, ...ids.filter(id => !prev.includes(id))]);
  };

  return (
    <div className="relative" ref={notificationRef}>
      {/* Bell Icon with Badge */}
      <motion.button
        className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiBell size={24} className={unreadCount > 0 ? "text-primary-600" : ""} />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              rotate: [0, 10, -10, 10, 0],
              boxShadow: [
                '0 0 0 0 rgba(220, 38, 38, 0.7)',
                '0 0 0 10px rgba(220, 38, 38, 0)',
                '0 0 0 0 rgba(220, 38, 38, 0)',
                '0 0 0 0 rgba(220, 38, 38, 0.7)',
              ]
            }}
            transition={{
              scale: { duration: 0.3 },
              rotate: { duration: 0.5, ease: "easeInOut" },
              boxShadow: {
                repeat: Infinity,
                duration: 2,
                repeatDelay: 1
              }
            }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100"
          >
            <div className="p-3 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-primary-700 flex items-center">
                <FiBell className="mr-2" />
                Notifications
              </h3>
              {notifications.length > 0 && (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={markAllAsRead}
                    className="text-xs bg-white px-2 py-1 rounded-md text-primary-600 hover:text-primary-700 shadow-sm border border-primary-100"
                  >
                    Mark all read
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => notifications.forEach(n => removeNotification(n.id))}
                    className="text-xs bg-white px-2 py-1 rounded-md text-gray-600 hover:text-gray-700 shadow-sm border border-gray-100"
                  >
                    Clear all
                  </motion.button>
                </div>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div>
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !readNotifications.includes(notification.id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <Link
                        to={`/auctions/${notification.auctionId}`}
                        onClick={() => handleNotificationClick(notification)}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 mr-3 mt-1 bg-gray-100 p-2 rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${!readNotifications.includes(notification.id) ? 'font-medium text-gray-900' : 'text-gray-800'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiClock className="mr-1" size={12} />
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Dismiss"
                        >
                          <FiX size={16} />
                        </motion.button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                  <FiBell size={32} className="mb-2 text-gray-300" />
                  <p>No notifications</p>
                  <p className="text-xs mt-1">You're all caught up!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
