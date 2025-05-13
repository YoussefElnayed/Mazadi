import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

const AuctionTimer = ({ endTime, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = end - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        if (onEnd) onEnd();
        return;
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, ended: false });
    };

    // Calculate immediately and then set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  // Get urgency class based on time left
  const getUrgencyClass = () => {
    if (timeLeft.ended) return 'bg-gray-500';
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 5) {
      return 'bg-red-500 animate-pulse';
    }
    if (timeLeft.days === 0 && timeLeft.hours < 1) {
      return 'bg-orange-500';
    }
    return 'bg-green-500';
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <FiClock className="mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold">Auction {timeLeft.ended ? 'Ended' : 'Ends In'}</h3>
      </div>

      {timeLeft.ended ? (
        <div className="text-red-500 font-bold">This auction has ended</div>
      ) : (
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          <motion.div
            className="bg-gray-100 rounded-lg p-2 sm:p-3 text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: timeLeft.seconds === 0 ? 1 : 0 }}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.days}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Days</div>
          </motion.div>

          <motion.div
            className="bg-gray-100 rounded-lg p-2 sm:p-3 text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: timeLeft.seconds === 0 ? 1 : 0 }}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Hours</div>
          </motion.div>

          <motion.div
            className="bg-gray-100 rounded-lg p-2 sm:p-3 text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: timeLeft.seconds === 0 ? 1 : 0 }}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Minutes</div>
          </motion.div>

          <motion.div
            className="bg-gray-100 rounded-lg p-2 sm:p-3 text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Seconds</div>
          </motion.div>
        </div>
      )}

      {!timeLeft.ended && (
        <div className={`mt-3 p-2 rounded-md text-white text-center text-sm ${getUrgencyClass()}`}>
          {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 5
            ? 'Hurry! Auction ending very soon!'
            : timeLeft.days === 0 && timeLeft.hours < 1
              ? 'Auction ending soon!'
              : 'Auction in progress'}
        </div>
      )}
    </div>
  );
};

export default AuctionTimer;
