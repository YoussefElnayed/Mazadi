import { motion } from 'framer-motion'
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiAlertTriangle, FiHelpCircle } from 'react-icons/fi'

const Returns = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Returns & Exchanges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our hassle-free policy ensures your satisfaction with every purchase.
          </p>
        </motion.div>

        {/* Return Policy Overview */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiRefreshCw className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Return Policy</h2>
                <p className="text-gray-600 mb-4">
                  At Mazadi, we stand behind the quality of our products. If you're not completely satisfied with your purchase, we offer a straightforward return and exchange policy to ensure your shopping experience is risk-free.
                </p>
                <div className="bg-primary-50 border border-primary-100 rounded-md p-4">
                  <p className="text-primary-800 font-medium">
                    You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Return Process */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Return Process</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Return an Item</h3>
              <ol className="list-decimal pl-5 space-y-4 text-gray-600">
                <li>
                  <span className="font-medium text-gray-900">Initiate a Return:</span> Log into your Mazadi account, go to "My Orders," find the item you wish to return, and click "Return Item." Alternatively, contact our customer service team.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Receive Return Authorization:</span> Once your return request is approved, you'll receive a Return Merchandise Authorization (RMA) number and return shipping instructions.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Package Your Return:</span> Securely pack the item in its original packaging if possible. Include all accessories, manuals, and free gifts that came with the item.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Ship Your Return:</span> Attach the provided return shipping label to your package and drop it off at the designated shipping carrier location.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Refund Processing:</span> Once we receive and inspect your return, we'll process your refund. This typically takes 3-5 business days, and you'll receive an email notification when it's complete.
                </li>
              </ol>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Refund Methods</h3>
              <p className="text-gray-600 mb-4">
                Refunds will be issued to the original payment method used for the purchase:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Credit/debit card refunds typically take 5-10 business days to appear on your statement</li>
                <li>PayPal refunds are usually processed within 3-5 business days</li>
                <li>Bank transfer refunds may take 7-10 business days</li>
                <li>Store credit is available immediately upon refund approval</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Exchange Process */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Exchange Process</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              If you'd like to exchange an item instead of returning it for a refund, follow these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-gray-600 mb-6">
              <li>Initiate an exchange request through your account or by contacting customer service</li>
              <li>Specify the item you wish to receive in exchange</li>
              <li>If there's a price difference, we'll either charge or refund the difference</li>
              <li>Ship the original item back using our return process</li>
              <li>Once we receive the original item, we'll ship the exchange item to you</li>
            </ol>
            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
              <div className="flex items-start">
                <FiAlertTriangle className="text-yellow-500 w-5 h-5 mr-3 mt-0.5" />
                <p className="text-yellow-800">
                  Please note that exchanges are subject to product availability. If the requested exchange item is out of stock, we'll contact you to discuss alternatives.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Eligible vs Non-Eligible Items */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Return Eligibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FiCheckCircle className="text-green-500 w-6 h-6 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Eligible for Return</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Unopened items in original packaging</li>
                <li>Defective or damaged products (reported within 7 days)</li>
                <li>Incorrect items received</li>
                <li>Items that don't match the description</li>
                <li>Most electronics within 30 days of delivery</li>
                <li>Clothing and accessories with tags attached</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FiXCircle className="text-red-500 w-6 h-6 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Not Eligible for Return</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Items returned after 30 days</li>
                <li>Products with missing parts or accessories</li>
                <li>Damaged items due to customer misuse</li>
                <li>Digital downloads and software</li>
                <li>Personalized or custom-made items</li>
                <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                <li>Personal care items and undergarments</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-start mb-2">
                  <FiHelpCircle className="text-primary-600 w-5 h-5 mr-3 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-900">Do I have to pay for return shipping?</h3>
                </div>
                <p className="text-gray-600 ml-8">
                  If you're returning an item due to our error (wrong item, defective product, etc.), we'll cover the return shipping costs. For other returns, a shipping fee may be deducted from your refund.
                </p>
              </div>
              
              <div>
                <div className="flex items-start mb-2">
                  <FiHelpCircle className="text-primary-600 w-5 h-5 mr-3 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-900">How long do refunds take to process?</h3>
                </div>
                <p className="text-gray-600 ml-8">
                  Once we receive your return, it typically takes 3-5 business days to inspect and process. After that, it may take an additional 5-10 business days for the refund to appear on your original payment method.
                </p>
              </div>
              
              <div>
                <div className="flex items-start mb-2">
                  <FiHelpCircle className="text-primary-600 w-5 h-5 mr-3 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-900">Can I return an item I purchased on sale?</h3>
                </div>
                <p className="text-gray-600 ml-8">
                  Yes, sale items follow our standard return policy unless they are specifically marked as "Final Sale" or "Non-Returnable."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact for Return Questions */}
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Our customer service team is ready to assist you with any questions about returns or exchanges.
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

export default Returns
