import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiArrowLeft, FiTrash2 } from 'react-icons/fi'
import { AuthContext } from '../context/AuthContext'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'
import toast from 'react-hot-toast'

const Wishlist = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  }

  useEffect(() => {
    // Simulate fetching wishlist items
    setLoading(true)
    setTimeout(() => {
      setWishlistItems([])
      setLoading(false)
    }, 1000)
  }, [])

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId))
    toast.success('Item removed from wishlist')
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast.success('Wishlist cleared')
  }

  if (loading) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">
              Save items you like to your wishlist and they'll appear here.
            </p>
            <Link to="/products">
              <Button icon={<FiArrowLeft />} iconPosition="left">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <Button 
            variant="outline" 
            onClick={clearWishlist}
            icon={<FiTrash2 />}
          >
            Clear All
          </Button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {wishlistItems.map((product) => (
              <motion.div key={product._id} variants={itemVariants} exit="exit">
                <ProductCard 
                  product={product} 
                  onRemoveWishlist={() => removeFromWishlist(product._id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Wishlist
