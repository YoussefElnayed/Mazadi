import { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiFilter, FiSearch, FiSliders } from 'react-icons/fi';
import AuctionCard from '../components/ui/AuctionCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import FilterPanel from '../components/ui/FilterPanel';
import { getAllAuctions } from '../services/auctionService';
import { AuctionContext } from '../context/AuctionContext';
import toast from 'react-hot-toast';

const Auctions = () => {
  const { activeAuctions } = useContext(AuctionContext);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, upcoming, ended
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: [0, 10000],
    condition: [],
    brand: [],
    category: []
  });

  // Mock data for filters
  const conditions = [
    { value: 'new', label: 'New' },
    { value: 'used', label: 'Used' },
    { value: 'refurbished', label: 'Refurbished' },
    { value: 'open-box', label: 'Open Box' }
  ];

  const brands = [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'sony', label: 'Sony' },
    { value: 'lg', label: 'LG' },
    { value: 'dell', label: 'Dell' },
    { value: 'hp', label: 'HP' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'google', label: 'Google' }
  ];

  const categories = [
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'laptops', label: 'Laptops' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'tvs', label: 'TVs' },
    { value: 'cameras', label: 'Cameras' },
    { value: 'audio', label: 'Audio' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'wearables', label: 'Wearables' }
  ];

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

  // Apply advanced filters
  const applyAdvancedFilters = (filters) => {
    setAdvancedFilters(filters);
  };

  // Reset advanced filters
  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      priceRange: [0, 10000],
      condition: [],
      brand: [],
      category: []
    });
  };

  // Filter auctions based on status, search query, and advanced filters
  const filteredAuctions = auctions.filter(auction => {
    // Filter by status
    if (filter === 'active' && auction.status !== 'active') return false;
    if (filter === 'upcoming' && auction.status !== 'upcoming') return false;
    if (filter === 'ended' && auction.status !== 'ended') return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = auction.product.pName.toLowerCase().includes(query);
      const descMatch = auction.product.pDescription?.toLowerCase().includes(query);
      if (!nameMatch && !descMatch) return false;
    }

    // Filter by price range
    if (auction.currentPrice < advancedFilters.priceRange[0] ||
        auction.currentPrice > advancedFilters.priceRange[1]) {
      return false;
    }

    // Filter by condition
    if (advancedFilters.condition.length > 0 &&
        !advancedFilters.condition.includes(auction.product.pCondition)) {
      return false;
    }

    // Filter by brand
    if (advancedFilters.brand.length > 0) {
      // This is a mock implementation - in a real app, you'd have brand info in the auction data
      const brandMatch = advancedFilters.brand.some(brand =>
        auction.product.pName.toLowerCase().includes(brand.toLowerCase())
      );
      if (!brandMatch) return false;
    }

    // Filter by category
    if (advancedFilters.category.length > 0 &&
        !advancedFilters.category.includes(auction.product.pCategory?.cName)) {
      return false;
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-3/4">
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
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 md:w-1/4"
            >
              <FiSliders className="mr-2" />
              Advanced Filters
              {Object.values(advancedFilters).some(f => Array.isArray(f) ? f.length > 0 : true) && (
                <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
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

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="mt-4">
              <FilterPanel
                filters={advancedFilters}
                setFilters={setAdvancedFilters}
                categories={categories}
                brands={brands}
                conditions={conditions}
                minPrice={0}
                maxPrice={10000}
                onApplyFilters={applyAdvancedFilters}
                onResetFilters={resetAdvancedFilters}
              />
            </div>
          )}
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
