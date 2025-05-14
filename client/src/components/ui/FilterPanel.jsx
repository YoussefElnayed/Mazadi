import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const FilterPanel = ({ 
  filters, 
  setFilters, 
  categories, 
  brands, 
  conditions, 
  minPrice, 
  maxPrice, 
  onApplyFilters,
  onResetFilters,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    condition: true,
    brand: true,
    category: true
  });

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle price range change
  const handlePriceChange = (value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (filterType, value) => {
    setLocalFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  // Apply filters
  const applyFilters = () => {
    setFilters(localFilters);
    onApplyFilters(localFilters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    const resetValues = {
      priceRange: [minPrice, maxPrice],
      condition: [],
      brand: [],
      category: []
    };
    setLocalFilters(resetValues);
    setFilters(resetValues);
    onResetFilters();
  };

  // Format price for display
  const formatPrice = (price) => {
    return `$${price.toFixed(0)}`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FiFilter className="mr-2" />
          Filters
          {Object.values(localFilters).some(f => Array.isArray(f) ? f.length > 0 : f) && (
            <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <motion.div
        className={`bg-white rounded-lg shadow-md overflow-hidden ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium">Filter Auctions</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset All
          </button>
        </div>

        <div className="p-4 max-h-[70vh] md:max-h-none overflow-y-auto">
          {/* Price Range */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-medium mb-2"
            >
              <span>Price Range</span>
              {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSections.price && (
              <div className="mt-2">
                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  value={localFilters.priceRange}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: '#6366f1' }]}
                  handleStyle={[
                    { backgroundColor: '#6366f1', borderColor: '#6366f1' },
                    { backgroundColor: '#6366f1', borderColor: '#6366f1' }
                  ]}
                  railStyle={{ backgroundColor: '#e5e7eb' }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{formatPrice(localFilters.priceRange[0])}</span>
                  <span>{formatPrice(localFilters.priceRange[1])}</span>
                </div>
              </div>
            )}
          </div>

          {/* Condition */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('condition')}
              className="flex items-center justify-between w-full text-left font-medium mb-2"
            >
              <span>Condition</span>
              {expandedSections.condition ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSections.condition && (
              <div className="space-y-2 mt-2">
                {conditions.map((condition) => (
                  <label key={condition.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                      checked={localFilters.condition.includes(condition.value)}
                      onChange={() => handleCheckboxChange('condition', condition.value)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{condition.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full text-left font-medium mb-2"
            >
              <span>Brand</span>
              {expandedSections.brand ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSections.brand && (
              <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                      checked={localFilters.brand.includes(brand.value)}
                      onChange={() => handleCheckboxChange('brand', brand.value)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{brand.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left font-medium mb-2"
            >
              <span>Category</span>
              {expandedSections.category ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {expandedSections.category && (
              <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                      checked={localFilters.category.includes(category.value)}
                      onChange={() => handleCheckboxChange('category', category.value)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>

        {/* Mobile Close Button */}
        <div className="md:hidden p-4 border-t border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterPanel;
