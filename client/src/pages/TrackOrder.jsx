import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPackage, FiSearch, FiTruck, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({})
    
    // Validate form
    let hasErrors = false
    const newErrors = {}
    
    if (!orderNumber.trim()) {
      newErrors.orderNumber = 'Order number is required'
      hasErrors = true
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
      hasErrors = true
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
      hasErrors = true
    }
    
    if (hasErrors) {
      setErrors(newErrors)
      return
    }
    
    // Simulate tracking order
    setLoading(true)
    setTimeout(() => {
      // Simulate random order status for demo purposes
      const statuses = ['processing', 'shipped', 'delivered', 'cancelled']
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      
      setOrderStatus({
        status: randomStatus,
        orderNumber: orderNumber,
        date: new Date().toLocaleDateString(),
        items: [
          { name: 'iPhone 13 Pro', quantity: 1, price: 999 },
          { name: 'AirPods Pro', quantity: 1, price: 249 }
        ],
        shippingAddress: '123 Main St, Anytown, CA 12345',
        trackingNumber: 'TRK' + Math.floor(Math.random() * 10000000),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
      })
      
      setLoading(false)
    }, 1500)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <FiClock className="text-yellow-500 w-6 h-6" />
      case 'shipped':
        return <FiTruck className="text-blue-500 w-6 h-6" />
      case 'delivered':
        return <FiCheckCircle className="text-green-500 w-6 h-6" />
      case 'cancelled':
        return <FiAlertCircle className="text-red-500 w-6 h-6" />
      default:
        return <FiPackage className="text-gray-500 w-6 h-6" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Your order is being processed'
      case 'shipped':
        return 'Your order has been shipped'
      case 'delivered':
        return 'Your order has been delivered'
      case 'cancelled':
        return 'Your order has been cancelled'
      default:
        return 'Status unknown'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Track Your Order</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your order details below to check the current status of your purchase.
          </p>
        </motion.div>

        {/* Tracking Form */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Number
                </label>
                <input
                  id="orderNumber"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                    errors.orderNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., ORD12345678"
                />
                {errors.orderNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.orderNumber}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="The email you used for your order"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <Button
                type="submit"
                isLoading={loading}
                icon={<FiSearch />}
                className="w-full"
              >
                Track Order
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Order Status */}
        {orderStatus && (
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Status Header */}
              <div className={`p-6 border-b ${getStatusClass(orderStatus.status)}`}>
                <div className="flex items-center">
                  {getStatusIcon(orderStatus.status)}
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{getStatusText(orderStatus.status)}</h2>
                    <p className="text-sm">
                      Order #{orderStatus.orderNumber} • Placed on {orderStatus.date}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Address:</span> {orderStatus.shippingAddress}
                    </p>
                    {orderStatus.status !== 'processing' && orderStatus.status !== 'cancelled' && (
                      <>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Tracking Number:</span> {orderStatus.trackingNumber}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Estimated Delivery:</span> {orderStatus.estimatedDelivery}
                        </p>
                      </>
                    )}
                  </div>
                  
                  {/* Order Summary */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      {orderStatus.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          ${orderStatus.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tracking Timeline */}
              {orderStatus.status !== 'cancelled' && (
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Tracking Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="relative z-10 mb-6 flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus.status !== 'processing' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <FiCheckCircle />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Order Placed</h4>
                        <p className="text-sm text-gray-500">{orderStatus.date}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 mb-6 flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus.status !== 'processing' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <FiClock />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Processing</h4>
                        <p className="text-sm text-gray-500">
                          {orderStatus.status === 'processing' ? 'In progress' : 'Completed'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 mb-6 flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus.status === 'shipped' || orderStatus.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <FiTruck />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Shipped</h4>
                        <p className="text-sm text-gray-500">
                          {orderStatus.status === 'shipped' || orderStatus.status === 'delivered' ? 
                            'Your order is on the way' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        orderStatus.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <FiPackage />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Delivered</h4>
                        <p className="text-sm text-gray-500">
                          {orderStatus.status === 'delivered' ? 
                            'Your order has been delivered' : `Estimated: ${orderStatus.estimatedDelivery}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="p-6 border-t border-gray-200 flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success('Order details have been sent to your email')
                  }}
                >
                  Email Details
                </Button>
                
                {orderStatus.status === 'processing' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success('Our team will contact you shortly')
                    }}
                  >
                    Cancel Order
                  </Button>
                )}
                
                <Button
                  onClick={() => {
                    toast.success('Our team will contact you shortly')
                  }}
                >
                  Need Help?
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          className="max-w-3xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you're having trouble tracking your order or have any questions, our customer service team is here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/faq"
                className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                View FAQs
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TrackOrder
