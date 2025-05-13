import { motion } from 'framer-motion'
import { FiCreditCard, FiDollarSign, FiShield, FiLock, FiHelpCircle } from 'react-icons/fi'
import { SiVisa, SiMastercard, SiAmericanexpress, SiPaypal } from 'react-icons/si'

const PaymentMethods = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Payment Methods</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure and flexible payment options for your convenience.
          </p>
        </motion.div>

        {/* Accepted Payment Methods */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Accepted Payment Methods</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FiCreditCard className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Credit & Debit Cards</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We accept all major credit and debit cards for secure online payments.
                </p>
                <div className="flex space-x-4 mb-6">
                  <SiVisa className="text-blue-700 w-10 h-10" />
                  <SiMastercard className="text-red-500 w-10 h-10" />
                  <SiAmericanexpress className="text-blue-500 w-10 h-10" />
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Visa</li>
                  <li>MasterCard</li>
                  <li>American Express</li>
                  <li>Discover</li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FiDollarSign className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Digital Wallets & Other Methods</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We also support various digital payment methods for your convenience.
                </p>
                <div className="flex space-x-4 mb-6">
                  <SiPaypal className="text-blue-600 w-10 h-10" />
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>PayPal</li>
                  <li>Bank Transfer</li>
                  <li>Apple Pay (coming soon)</li>
                  <li>Google Pay (coming soon)</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Security */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment Security</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiShield className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Security is Our Priority</h3>
                <p className="text-gray-600 mb-4">
                  At Mazadi, we take the security of your payment information very seriously. We implement multiple layers of protection to ensure your data remains safe and secure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <FiLock className="text-primary-600 mr-2" />
                      <span className="font-medium text-gray-900">SSL Encryption</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      All payment transactions are protected with 256-bit SSL encryption technology.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <FiLock className="text-primary-600 mr-2" />
                      <span className="font-medium text-gray-900">PCI Compliance</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      We adhere to all Payment Card Industry Data Security Standard (PCI DSS) requirements.
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  We never store your complete credit card information on our servers. All payment processing is handled by secure, trusted payment processors.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Billing Information */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Billing Information</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              When you make a purchase on Mazadi, the charge will appear on your statement as "MAZADI MARKETPLACE" or "MAZADI*[PRODUCT CATEGORY]".
            </p>
            <p className="text-gray-600 mb-4">
              For subscription-based services, you will be billed according to the terms specified at the time of purchase. You can manage your subscriptions and payment methods from your account settings.
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
              <p className="text-yellow-800">
                Please ensure your billing address matches the address associated with your payment method to avoid processing delays.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Currency & International Payments */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Currency & International Payments</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              All prices on Mazadi are displayed in US Dollars (USD). If you're making a purchase with a non-USD payment method, your bank or card issuer will convert the amount at their current exchange rate and may charge a conversion fee.
            </p>
            <p className="text-gray-600 mb-4">
              For international orders, please note:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Additional bank fees may apply for international transactions</li>
              <li>Import duties and taxes are not included in the product price or shipping cost</li>
              <li>You may be required to pay these charges upon delivery</li>
              <li>Payment verification may take longer for international orders</li>
            </ul>
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
                  <h3 className="text-lg font-semibold text-gray-900">When will my card be charged?</h3>
                </div>
                <p className="text-gray-600 ml-8">
                  Your card will be charged immediately after you complete your purchase and receive an order confirmation.
                </p>
              </div>
              
              <div>
                <div className="flex items-start mb-2">
                  <FiHelpCircle className="text-primary-600 w-5 h-5 mr-3 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-900">What if my payment is declined?</h3>
                </div>
                <p className="text-gray-600 ml-8">
                  If your payment is declined, you'll receive an error message. Please verify your payment information and try again, or use a different payment method. If problems persist, contact your bank or our customer service team.
                </p>
              </div>
              
              <div>
                <div className="flex items-start mb-2">
                  <FiHelpCircle className="text-primary-600 w-5 h-5 mr-3 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-900">How do I update my payment method?</h3>
                </div>
                <p className="text-gray-600 ml-8">
                  You can update your payment methods by logging into your account, navigating to "Account Settings," and selecting "Payment Methods." From there, you can add, edit, or remove payment options.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact for Payment Questions */}
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-4">Have Questions About Payments?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Our customer service team is ready to assist you with any payment-related inquiries.
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

export default PaymentMethods
