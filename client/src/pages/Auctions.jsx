import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiFilter, FiSearch } from 'react-icons/fi';
import AuctionCard from '../components/ui/AuctionCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getAllAuctions } from '../services/auctionService';
import { AuctionContext } from '../context/AuctionContext';
import toast from 'react-hot-toast';

const Auctions = () => {
  const { activeAuctions, loading: contextLoading } = useContext(AuctionContext);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, upcoming, ended
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const data = await getAllAuctions();
        setAuctions(data || []);
      } catch (error) {
        console.error('Error fetching auctions:', error);
        toast.error('Failed to load auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // Filter auctions based on status and search query
  const filteredAuctions = auctions.filter(auction => {
    // Filter by status
    if (filter === 'active' && auction.status !== 'active') return false;
    if (filter === 'upcoming' && auction.status !== 'upcoming') return false;
    if (filter === 'ended' && auction.status !== 'ended') return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return auction.product.pName.toLowerCase().includes(query) ||
             auction.product.pDescription.toLowerCase().includes(query);
    }

    return true;
  });

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

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Live Auctions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bid on exclusive electronics and gadgets. Find amazing deals and unique items.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search auctions..."
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex md:space-x-2 gap-2 md:gap-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium ${
                filter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('ended')}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium ${
                filter === 'ended'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Ended
            </button>
          </div>
        </div>

        {/* Auctions Grid */}
        {loading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredAuctions.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredAuctions.map((auction) => (
              <motion.div key={auction._id} variants={itemVariants}>
                <AuctionCard auction={auction} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <FiFilter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No auctions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auctions;
