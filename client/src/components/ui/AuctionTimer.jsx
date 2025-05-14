import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiAlertCircle } from 'react-icons/fi';

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

  // Get time unit color based on urgency
  const getTimeUnitColor = (unit) => {
    if (timeLeft.ended) return 'bg-gray-100 text-gray-500';

    if (timeLeft.days === 0) {
      if (unit === 'seconds') return 'bg-red-100 text-red-700';
      if (unit === 'minutes' && timeLeft.minutes < 5) return 'bg-red-100 text-red-700';
      if (unit === 'hours' && timeLeft.hours < 1) return 'bg-orange-100 text-orange-700';
      if (unit === 'minutes' && timeLeft.hours < 1) return 'bg-orange-100 text-orange-700';
    }

    return 'bg-gray-100 text-gray-700';
  };

  // Get animation for time unit
  const getTimeUnitAnimation = (unit) => {
    if (timeLeft.ended) return {};

    if (unit === 'seconds') {
      return {
        scale: [1, 1.05, 1],
        transition: { duration: 1, repeat: Infinity }
      };
    }

    if (unit === 'minutes' && timeLeft.seconds === 0) {
      return {
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      };
    }

    if (unit === 'hours' && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      return {
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      };
    }

    if (unit === 'days' && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      return {
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      };
    }

    return {};
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <FiClock className={`mr-2 ${
          timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 5
            ? 'text-red-600 animate-pulse'
            : timeLeft.days === 0 && timeLeft.hours < 1
              ? 'text-orange-600'
              : 'text-gray-600'
        }`} />
        <h3 className="text-lg font-semibold">Auction {timeLeft.ended ? 'Ended' : 'Ends In'}</h3>
      </div>

      {timeLeft.ended ? (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md text-center">
          <FiAlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-red-600 font-bold">This auction has ended</div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          <motion.div
            className={`rounded-lg p-2 sm:p-3 text-center ${getTimeUnitColor('days')}`}
            initial={{ scale: 1 }}
            animate={getTimeUnitAnimation('days')}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.days}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Days</div>
          </motion.div>

          <motion.div
            className={`rounded-lg p-2 sm:p-3 text-center ${getTimeUnitColor('hours')}`}
            initial={{ scale: 1 }}
            animate={getTimeUnitAnimation('hours')}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Hours</div>
          </motion.div>

          <motion.div
            className={`rounded-lg p-2 sm:p-3 text-center ${getTimeUnitColor('minutes')}`}
            initial={{ scale: 1 }}
            animate={getTimeUnitAnimation('minutes')}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Minutes</div>
          </motion.div>

          <motion.div
            className={`rounded-lg p-2 sm:p-3 text-center ${getTimeUnitColor('seconds')}`}
            initial={{ scale: 1 }}
            animate={getTimeUnitAnimation('seconds')}
          >
            <div className="text-lg sm:text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Seconds</div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {!timeLeft.ended && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`mt-3 p-2 rounded-md text-white text-center text-sm ${getUrgencyClass()}`}
          >
            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 5 ? (
              <div className="flex items-center justify-center">
                <FiAlertCircle className="mr-1" />
                <span>Hurry! Auction ending very soon!</span>
              </div>
            ) : timeLeft.days === 0 && timeLeft.hours < 1 ? (
              <div className="flex items-center justify-center">
                <FiClock className="mr-1" />
                <span>Auction ending soon!</span>
              </div>
            ) : (
              <span>Auction in progress</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuctionTimer;
