import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiUsers, FiArrowUp } from 'react-icons/fi'
import LazyImage from './LazyImage'

const AuctionCard = ({ auction }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  // Calculate time left until auction ends
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endTime = new Date(auction.endTime);
      const difference = endTime - now;

      if (difference <= 0) {
        // Auction has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
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
  }, [auction.endTime]);

  // Format bid count text
  const getBidText = () => {
    const count = auction.bids?.length || 0;
    return count === 1 ? '1 bid' : `${count} bids`;
  };

  return (
    <motion.div
      className="card group relative overflow-hidden"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/auctions/${auction._id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
            <LazyImage
              src={`/uploads/products/${auction.product.pImages[0]}`}
              alt={auction.product.pName}
              className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
              aspectRatio="1/1"
            />
          </div>

          {/* Auction Status Badge */}
          <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded ${
            timeLeft.ended || auction.status === 'ended'
              ? 'bg-red-500'
              : auction.status === 'active'
                ? 'bg-green-500'
                : 'bg-blue-500'
          }`}>
            {timeLeft.ended || auction.status === 'ended'
              ? 'Ended'
              : auction.status === 'active'
                ? 'Active'
                : 'Upcoming'}
          </div>

          {/* Time Left */}
          {!timeLeft.ended && auction.status === 'active' && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-center text-xs">
              <div className="flex items-center justify-center space-x-1">
                <FiClock className="text-yellow-400" />
                <span>
                  {timeLeft.days > 0 && `${timeLeft.days}d `}
                  {timeLeft.hours.toString().padStart(2, '0')}:
                  {timeLeft.minutes.toString().padStart(2, '0')}:
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Auction Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">{auction.product.pName}</h3>

          <div className="mt-2 flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-gray-900">${auction.currentPrice.toFixed(2)}</span>
              <div className="text-xs text-gray-500">Starting: ${auction.startingPrice.toFixed(2)}</div>
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <FiUsers className="mr-1" />
              <span>{getBidText()}</span>
            </div>
          </div>

          {/* Latest Bid */}
          {auction.bids && auction.bids.length > 0 && (
            <div className="mt-2 text-xs text-gray-600 flex items-center">
              <FiArrowUp className="text-green-500 mr-1" />
              <span>Latest bid: ${auction.bids[auction.bids.length - 1].amount.toFixed(2)}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default AuctionCard;
