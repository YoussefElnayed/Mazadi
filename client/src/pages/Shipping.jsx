import { motion } from 'framer-motion'
import { FiTruck, FiClock, FiGlobe, FiPackage, FiAlertCircle } from 'react-icons/fi'

const Shipping = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Shipping Information</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our shipping policies, delivery times, and tracking options.
          </p>
        </motion.div>

        {/* Shipping Options */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Options</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FiTruck className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Standard Shipping</h3>
                </div>
                <p className="text-gray-600 mb-3">Delivery within 5-7 business days</p>
                <p className="text-gray-600 mb-3">Free shipping on orders over $50</p>
                <p className="font-semibold text-gray-900">$4.99</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FiClock className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Express Shipping</h3>
                </div>
                <p className="text-gray-600 mb-3">Delivery within 2-3 business days</p>
                <p className="text-gray-600 mb-3">Available for all orders</p>
                <p className="font-semibold text-gray-900">$9.99</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FiGlobe className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">International Shipping</h3>
                </div>
                <p className="text-gray-600 mb-3">Delivery within 7-14 business days</p>
                <p className="text-gray-600 mb-3">Available for most countries</p>
                <p className="font-semibold text-gray-900">Starting at $14.99</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Times */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Delivery Times</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Delivery times are estimated and begin from the date of shipping, not the date of order. Delivery times are not guaranteed and may vary depending on the following factors:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
              <li>Order processing time (typically 1-2 business days)</li>
              <li>Shipping destination</li>
              <li>Shipping method selected</li>
              <li>Customs clearance procedures for international orders</li>
              <li>Local delivery conditions and potential delays</li>
            </ul>
            <p className="text-gray-600">
              Please note that business days are Monday through Friday, excluding holidays. Orders placed on weekends or holidays will be processed on the next business day.
            </p>
          </div>
        </motion.div>

        {/* Tracking Your Order */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Tracking Your Order</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <FiPackage className="text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Track Your Order</h3>
                <p className="text-gray-600 mb-4">
                  Once your order ships, you will receive a shipping confirmation email with a tracking number and link. You can also track your order by:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Logging into your Mazadi account and visiting the "My Orders" section</li>
                  <li>Using the "Track Your Order" page with your order number and email</li>
                  <li>Contacting our customer service team with your order details</li>
                </ol>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shipping Restrictions */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Restrictions</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <FiAlertCircle className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Information</h3>
                <p className="text-gray-600 mb-4">
                  Please be aware of the following shipping restrictions:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>We currently do not ship to P.O. boxes</li>
                  <li>Some products cannot be shipped to certain international destinations due to local regulations</li>
                  <li>Additional customs fees, taxes, and duties may apply to international orders and are the responsibility of the recipient</li>
                  <li>Certain high-value items may require a signature upon delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact for Shipping Questions */}
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Have Questions About Shipping?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Our customer service team is ready to assist you with any shipping-related inquiries.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Shipping
