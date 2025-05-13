import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiShare2, FiMinus, FiPlus, FiStar, FiCheck } from 'react-icons/fi'
import Button from '../components/ui/Button'
import { getProductById, addProductReview } from '../services/productService'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [activeTab, setActiveTab] = useState('description')
  
  const { addToCart } = useContext(CartContext)
  const { isAuthenticated, user } = useContext(AuthContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(id)
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1 && newQuantity <= product.pQuantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    if (!isFavorite) {
      toast.success('Added to wishlist!')
    } else {
      toast.success('Removed from wishlist!')
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review')
      return
    }
    
    if (!reviewText.trim()) {
      toast.error('Please enter a review')
      return
    }
    
    try {
      const reviewData = {
        pId: product._id,
        uId: user._id,
        rating,
        review: reviewText
      }
      
      await addProductReview(reviewData)
      toast.success('Review submitted successfully!')
      setReviewText('')
      
      // Refresh product data to show the new review
      const updatedProduct = await getProductById(id)
      setProduct(updatedProduct)
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Failed to submit review')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-4">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    )
  }

  // Calculate average rating
  const averageRating = product.pRatingsReviews?.length
    ? (product.pRatingsReviews.reduce((sum, review) => sum + parseInt(review.rating), 0) / product.pRatingsReviews.length).toFixed(1)
    : 0

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm">
          <ol className="flex items-center space-x-1">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium truncate">{product.pName}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <motion.div 
                className="mb-4 rounded-lg overflow-hidden bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`/uploads/products/${product.pImages[selectedImage]}`}
                  alt={product.pName}
                  className="w-full h-96 object-contain"
                />
              </motion.div>
              
              <div className="grid grid-cols-5 gap-2">
                {product.pImages.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={`/uploads/products/${image}`}
                      alt={`${product.pName} - Image ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <motion.h1 
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {product.pName}
              </motion.h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {averageRating} ({product.pRatingsReviews?.length || 0} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">${product.pPrice.toFixed(2)}</span>
                {product.pOffer && product.pOffer !== 'null' && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${(product.pPrice * 1.2).toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Availability */}
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">Availability: </span>
                {product.pQuantity > 0 ? (
                  <span className="text-green-600 font-medium">In Stock ({product.pQuantity} available)</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700">{product.pDescription.slice(0, 200)}...</p>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.pQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="p-2 w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-0"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.pQuantity}
                    className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.pQuantity <= 0}
                  icon={<FiShoppingCart />}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  icon={<FiHeart className={isFavorite ? 'text-red-500 fill-current' : ''} />}
                >
                  {isFavorite ? 'Saved' : 'Wishlist'}
                </Button>
                
                <Button
                  variant="outline"
                  icon={<FiShare2 />}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.pRatingsReviews?.length || 0})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{product.pDescription}</p>
                  
                  {/* Features */}
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {['High quality materials', 'Durable construction', 'Easy to use', 'Versatile design'].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  
                  {/* Review Form */}
                  <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-semibold mb-2">Write a Review</h4>
                    {isAuthenticated ? (
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="p-1"
                              >
                                <FiStar
                                  className={`w-6 h-6 ${
                                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Review
                          </label>
                          <textarea
                            id="review"
                            rows="4"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="input w-full"
                            placeholder="Share your experience with this product..."
                          ></textarea>
                        </div>
                        
                        <Button type="submit">Submit Review</Button>
                      </form>
                    ) : (
                      <div>
                        <p className="text-gray-700 mb-2">Please log in to leave a review.</p>
                        <Link to="/login">
                          <Button variant="outline">Login</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  {/* Reviews List */}
                  {product.pRatingsReviews?.length > 0 ? (
                    <div className="space-y-6">
                      {product.pRatingsReviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-900">{review.user?.name || 'Anonymous'}</div>
                              <span className="mx-2 text-gray-500">•</span>
                              <div className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < parseInt(review.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
