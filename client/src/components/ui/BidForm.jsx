import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiArrowUp } from 'react-icons/fi';
import Button from './Button';
import { placeBid } from '../../services/auctionService';
import toast from 'react-hot-toast';

const BidForm = ({ auction, userId, onBidPlaced, disabled }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestedBids, setSuggestedBids] = useState([]);
  
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
        toast.success('Bid placed successfully!');
        setBidAmount('');
        if (onBidPlaced) onBidPlaced();
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Place Your Bid</h3>
      
      {disabled ? (
        <div className="bg-gray-100 p-3 rounded-md text-center text-gray-500 mb-3">
          This auction has ended
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Current Price</div>
            <div className="text-2xl font-bold">${auction.currentPrice.toFixed(2)}</div>
          </div>
          
          <form onSubmit={handleSubmit}>
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
                  disabled={loading || disabled}
                />
              </div>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              disabled={loading || disabled}
              icon={<FiArrowUp />}
            >
              Place Bid
            </Button>
          </form>
          
          {!disabled && (
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2">Suggested Bids</div>
              <div className="flex space-x-2">
                {suggestedBids.map((amount, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestedBid(amount)}
                    className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-center text-sm font-medium transition-colors"
                  >
                    ${amount.toFixed(2)}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BidForm;
