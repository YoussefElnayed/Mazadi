import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiArrowUp, FiCheck, FiTrendingUp, FiAward } from 'react-icons/fi';
import Button from './Button';
import { placeBid } from '../../services/auctionService';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const BidForm = ({ auction, userId, onBidPlaced, disabled }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestedBids, setSuggestedBids] = useState([]);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [bidValue, setBidValue] = useState(null);
  const formRef = useRef(null);

  // Function to trigger confetti effect
  const triggerConfetti = () => {
    const canvasConfetti = confetti.create(null, {
      resize: true,
      useWorker: true
    });

    canvasConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Calculate suggested bid amounts
  useEffect(() => {
    if (auction && auction.currentPrice) {
      const current = auction.currentPrice;
      const increment = Math.max(1, Math.floor(current * 0.05)); // 5% increment or at least $1

      // Generate 3 suggested bid amounts
      setSuggestedBids([
        current + increment,
        current + (increment * 2),
        current + (increment * 3)
      ]);
    }
  }, [auction]);

  // Handle bid submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBidSuccess(false);

    // Validate bid amount
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }

    if (amount <= auction.currentPrice) {
      setError(`Bid must be higher than current price ($${auction.currentPrice.toFixed(2)})`);
      return;
    }

    try {
      setLoading(true);
      const response = await placeBid(auction._id, userId, amount);

      if (response.success) {
        // Store the successful bid value for display
        setBidValue(amount);

        // Show success animation
        setBidSuccess(true);

        // Trigger confetti effect
        triggerConfetti();

        // Show toast notification
        toast.success('Bid placed successfully!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

        // Clear form after a delay
        setTimeout(() => {
          setBidAmount('');
          if (onBidPlaced) onBidPlaced();
        }, 1500);

        // Reset success state after animation completes
        setTimeout(() => {
          setBidSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      setError(error.response?.data?.error || 'Failed to place bid');
      toast.error(error.response?.data?.error || 'Failed to place bid');
    } finally {
      setLoading(false);
    }
  };

  // Handle suggested bid click
  const handleSuggestedBid = (amount) => {
    setBidAmount(amount.toString());
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden">
      <h3 className="text-lg font-semibold mb-3">Place Your Bid</h3>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {bidSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-50 bg-opacity-90 z-10 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-full p-4 mb-4 shadow-lg"
            >
              <FiCheck className="text-green-500 w-12 h-12" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">Bid Successful!</h3>
              <p className="text-green-600 mb-1">Your bid of <span className="font-bold">${bidValue?.toFixed(2)}</span> has been placed</p>
              <p className="text-sm text-green-500">You are now the highest bidder</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {disabled ? (
        <div className="bg-gray-100 p-3 rounded-md text-center text-gray-500 mb-3">
          This auction has ended
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Current Price</div>
            <div className="text-2xl font-bold flex items-center">
              <FiDollarSign className="mr-1 text-xl" />
              {auction.currentPrice.toFixed(2)}
              <FiTrendingUp className="ml-2 text-green-500" />
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Your Bid Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={auction.currentPrice + 0.01}
                  step="0.01"
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter amount"
                  disabled={loading || disabled || bidSuccess}
                />
                {parseFloat(bidAmount) > auction.currentPrice && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full"
                    >
                      +${(parseFloat(bidAmount) - auction.currentPrice).toFixed(2)}
                    </motion.div>
                  </div>
                )}
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              disabled={loading || disabled || bidSuccess}
              icon={<FiArrowUp />}
              className="relative overflow-hidden"
            >
              <span className="relative z-10">Place Bid</span>
            </Button>
          </form>

          {!disabled && !bidSuccess && (
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2 flex items-center">
                <FiAward className="mr-1 text-primary-500" />
                <span>Suggested Bids</span>
              </div>
              <div className="flex space-x-2">
                {suggestedBids.map((amount, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, backgroundColor: '#f0f9ff' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestedBid(amount)}
                    className={`flex-1 py-2 px-3 ${
                      parseFloat(bidAmount) === amount
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    } rounded-md text-center text-sm font-medium transition-colors`}
                  >
                    ${amount.toFixed(2)}
                  </motion.button>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Higher bids have a better chance of winning!
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BidForm;
