import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import ProductCard from '../components/ui/ProductCard'
import Button from '../components/ui/Button'
import { getAllProducts, getProductsByCategory, getProductsByPrice } from '../services/productService'
import { getAllCategories } from '../services/categoryService'

const Products = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [sortBy, setSortBy] = useState('newest')
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    rating: false
  })

  // Get query parameters
  const categoryParam = searchParams.get('category')
  const searchQuery = searchParams.get('search')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch categories
        const categoriesData = await getAllCategories()
        setCategories(categoriesData)
        
        // If category parameter exists, set it as selected and fetch products by category
        if (categoryParam) {
          setSelectedCategory(categoryParam)
          const productsData = await getProductsByCategory(categoryParam)
          setProducts(productsData)
        } else {
          // Otherwise fetch all products
          const productsData = await getAllProducts()
          setProducts(productsData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryParam])

  // Filter products by search query
  useEffect(() => {
    if (searchQuery && products.length > 0) {
      const filteredProducts = products.filter(product => 
        product.pName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.pDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setProducts(filteredProducts)
    }
  }, [searchQuery, products])

  const handleCategoryChange = async (categoryId) => {
    try {
      setLoading(true)
      setSelectedCategory(categoryId)
      
      if (categoryId) {
        const productsData = await getProductsByCategory(categoryId)
        setProducts(productsData)
      } else {
        const productsData = await getAllProducts()
        setProducts(productsData)
      }
    } catch (error) {
      console.error('Error fetching products by category:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePriceRangeChange = async () => {
    try {
      setLoading(true)
      const productsData = await getProductsByPrice(priceRange)
      setProducts(productsData)
    } catch (error) {
      console.error('Error fetching products by price:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    
    // Sort products based on selected option
    const sortedProducts = [...products]
    
    switch (value) {
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.pPrice - b.pPrice)
        break
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.pPrice - a.pPrice)
        break
      case 'popularity':
        sortedProducts.sort((a, b) => b.pSold - a.pSold)
        break
      case 'rating':
        sortedProducts.sort((a, b) => {
          const aRating = a.pRatingsReviews?.length ? a.pRatingsReviews.reduce((sum, review) => sum + parseInt(review.rating), 0) / a.pRatingsReviews.length : 0
          const bRating = b.pRatingsReviews?.length ? b.pRatingsReviews.reduce((sum, review) => sum + parseInt(review.rating), 0) / b.pRatingsReviews.length : 0
          return bRating - aRating
        })
        break
      default:
        break
    }
    
    setProducts(sortedProducts)
  }

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button 
              onClick={() => setFilterOpen(!filterOpen)} 
              className="w-full"
              icon={filterOpen ? <FiX /> : <FiFilter />}
            >
              {filterOpen ? 'Close Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <AnimatePresence>
            {(filterOpen || window.innerWidth >= 768) && (
              <motion.aside
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={`w-full md:w-64 bg-white rounded-lg shadow-md p-4 ${window.innerWidth < 768 ? 'fixed inset-0 z-50 overflow-auto' : 'sticky top-24 h-fit'}`}
              >
                <div className="flex justify-between items-center mb-4 md:hidden">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button 
                    onClick={() => setFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Categories Filter */}
                <div className="mb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFilter('categories')}
                  >
                    <h3 className="text-lg font-semibold">Categories</h3>
                    {expandedFilters.categories ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  
                  {expandedFilters.categories && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="all-categories"
                          name="category"
                          checked={selectedCategory === ''}
                          onChange={() => handleCategoryChange('')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="all-categories" className="ml-2 text-gray-700">
                          All Categories
                        </label>
                      </div>
                      
                      {categories.map(category => (
                        <div key={category._id} className="flex items-center">
                          <input
                            type="radio"
                            id={category._id}
                            name="category"
                            checked={selectedCategory === category._id}
                            onChange={() => handleCategoryChange(category._id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor={category._id} className="ml-2 text-gray-700">
                            {category.cName}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFilter('price')}
                  >
                    <h3 className="text-lg font-semibold">Price Range</h3>
                    {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  
                  {expandedFilters.price && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">${priceRange.min}</span>
                        <span className="text-gray-700">${priceRange.max}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="number"
                          min="0"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                          className="input"
                        />
                        <input
                          type="number"
                          min="0"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                          className="input"
                        />
                      </div>
                      
                      <Button 
                        onClick={handlePriceRangeChange} 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </div>

                {/* Clear All Filters Button */}
                <Button 
                  onClick={() => {
                    setSelectedCategory('')
                    setPriceRange({ min: 0, max: 1000 })
                    handleCategoryChange('')
                  }} 
                  variant="outline" 
                  className="w-full mt-4"
                >
                  Clear All Filters
                </Button>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{products.length}</span> results
                </p>
                
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="input py-1"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {products.map((product) => (
                  <motion.div key={product._id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any products matching your criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('')
                    setPriceRange({ min: 0, max: 1000 })
                    handleCategoryChange('')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
