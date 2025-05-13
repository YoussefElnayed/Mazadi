import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { CartContext } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  // Calculate discount percentage if there's an offer
  const hasDiscount = product.pOffer && product.pOffer !== 'null'
  
  return (
    <motion.div
      className="card group"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
            <img
              src={`/uploads/products/${product.pImages[0]}`}
              alt={product.pName}
              className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.pOffer}
            </div>
          )}
          
          {/* Action Buttons */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-black/70 p-2 flex justify-center space-x-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white text-gray-800 hover:bg-primary-500 hover:text-white transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <FiShoppingCart size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full bg-white hover:bg-red-500 hover:text-white transition-colors ${
                isFavorite ? 'text-red-500' : 'text-gray-800'
              }`}
              onClick={handleToggleFavorite}
              aria-label="Add to wishlist"
            >
              <FiHeart size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white text-gray-800 hover:bg-primary-500 hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <FiEye size={18} />
            </motion.button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">{product.pName}</h3>
          
          <div className="mt-1 flex items-center">
            <span className="text-lg font-bold text-gray-900">${product.pPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${(product.pPrice * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Rating Stars */}
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.pRatingsReviews?.length ? 4 : 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.pRatingsReviews?.length || 0} reviews)
            </span>
          </div>
          
          {/* Stock Status */}
          <div className="mt-2">
            {product.pQuantity > 0 ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
