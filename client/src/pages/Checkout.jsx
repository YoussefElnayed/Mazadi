import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCreditCard, FiUser, FiMapPin, FiPhone, FiTruck, FiCheck } from 'react-icons/fi'
import Button from '../components/ui/Button'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { createOrder } from '../services/orderService'
import toast from 'react-hot-toast'

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext)
  const { isAuthenticated, user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: user?.phoneNumber || '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart')
      toast.error('Your cart is empty')
    }
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } })
      toast.error('Please login to checkout')
    }
  }, [cartItems, isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validateShippingForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePaymentForm = () => {
    const newErrors = {}
    
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required'
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required'
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateShippingForm()) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (step === 2 && validatePaymentForm()) {
      try {
        setLoading(true)
        
        // Create order object
        const orderData = {
          allProduct: cartItems.map(item => ({
            id: item._id,
            quantitiy: item.quantity
          })),
          user: user._id,
          amount: totalPrice,
          transactionId: 'tr_' + Math.random().toString(36).substr(2, 9),
          address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          phone: formData.phone,
          status: 'Not processed'
        }
        
        // Submit order
        const response = await createOrder(orderData)
        
        if (response.success) {
          // Clear cart
          clearCart()
          
          // Show success message
          toast.success('Order placed successfully!')
          
          // Redirect to order confirmation
          navigate('/dashboard/orders')
        }
      } catch (error) {
        console.error('Error placing order:', error)
        toast.error('Failed to place order. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <FiUser />
              </div>
              <div className={`ml-2 text-sm font-medium ${
                step >= 1 ? 'text-primary-600' : 'text-gray-500'
              }`}>
                Shipping
              </div>
            </div>
            <div className={`flex-1 h-1 mx-4 ${
              step >= 2 ? 'bg-primary-600' : 'bg-gray-200'
            }`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <FiCreditCard />
              </div>
              <div className={`ml-2 text-sm font-medium ${
                step >= 2 ? 'text-primary-600' : 'text-gray-500'
              }`}>
                Payment
              </div>
            </div>
            <div className={`flex-1 h-1 mx-4 ${
              step >= 3 ? 'bg-primary-600' : 'bg-gray-200'
            }`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <FiCheck />
              </div>
              <div className={`ml-2 text-sm font-medium ${
                step >= 3 ? 'text-primary-600' : 'text-gray-500'
              }`}>
                Confirmation
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="md:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUser className="text-gray-400" />
                          </div>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`input pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                        )}
                      </div>
                      
                      {/* Email */}
                      <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                      
                      {/* Address */}
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMapPin className="text-gray-400" />
                          </div>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            className={`input pl-10 ${errors.address ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>
                      
                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleChange}
                          className={`input ${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                        )}
                      </div>
                      
                      {/* State */}
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={formData.state}
                          onChange={handleChange}
                          className={`input ${errors.state ? 'border-red-500' : ''}`}
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                        )}
                      </div>
                      
                      {/* ZIP Code */}
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`input ${errors.zipCode ? 'border-red-500' : ''}`}
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                        )}
                      </div>
                      
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiPhone className="text-gray-400" />
                          </div>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleNextStep}>
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                    
                    <div className="mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            id="credit-card"
                            name="paymentMethod"
                            type="radio"
                            value="credit-card"
                            checked={formData.paymentMethod === 'credit-card'}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor="credit-card" className="ml-2 block text-sm text-gray-700">
                            Credit Card
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="paypal"
                            name="paymentMethod"
                            type="radio"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor="paypal" className="ml-2 block text-sm text-gray-700">
                            PayPal
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'credit-card' && (
                      <div className="space-y-4">
                        {/* Card Number */}
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            id="cardNumber"
                            name="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`input ${errors.cardNumber ? 'border-red-500' : ''}`}
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                          )}
                        </div>
                        
                        {/* Name on Card */}
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            id="cardName"
                            name="cardName"
                            type="text"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`input ${errors.cardName ? 'border-red-500' : ''}`}
                          />
                          {errors.cardName && (
                            <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {/* Expiry Date */}
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="cardExpiry"
                              name="cardExpiry"
                              type="text"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              className={`input ${errors.cardExpiry ? 'border-red-500' : ''}`}
                            />
                            {errors.cardExpiry && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
                            )}
                          </div>
                          
                          {/* CVC */}
                          <div>
                            <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                              CVC
                            </label>
                            <input
                              id="cardCvc"
                              name="cardCvc"
                              type="text"
                              placeholder="123"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              className={`input ${errors.cardCvc ? 'border-red-500' : ''}`}
                            />
                            {errors.cardCvc && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formData.paymentMethod === 'paypal' && (
                      <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-sm text-gray-700">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={handlePrevStep}
                      >
                        Back to Shipping
                      </Button>
                      <Button 
                        type="submit"
                        isLoading={loading}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center py-2 border-b border-gray-200 last:border-b-0">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={`/uploads/products/${item.pImages[0]}`}
                        alt={item.pName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.pName}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.pPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <FiTruck className="text-primary-600 mr-2" />
                  <span className="text-sm text-gray-700">Free shipping on all orders</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
