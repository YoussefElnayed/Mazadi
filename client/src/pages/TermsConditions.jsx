import { motion } from 'framer-motion'
import { FiFileText, FiUserCheck, FiShoppingBag, FiCreditCard, FiAlertTriangle, FiGlobe } from 'react-icons/fi'

const TermsConditions = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Terms & Conditions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform.
          </p>
          <p className="text-gray-500 mt-2">Last Updated: June 15, 2023</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiFileText className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Mazadi. These Terms and Conditions ("Terms") govern your use of the Mazadi website and services (collectively, the "Services") operated by Mazadi LLC ("we," "us," or "our").
                </p>
                <p className="text-gray-600 mb-4">
                  By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Services.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-yellow-800">
                    <strong>Important:</strong> These Terms constitute a legally binding agreement between you and Mazadi. Please read them carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Accounts */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiUserCheck className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Creation</h3>
                <p className="text-gray-600 mb-4">
                  To use certain features of our Services, you may be required to create an account. When you create an account, you must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Responsibilities</h3>
                <p className="text-gray-600 mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly update your account information if it changes</li>
                  <li>Notify us immediately of any unauthorized access to or use of your account</li>
                  <li>Take responsibility for all activities that occur under your account</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Termination</h3>
                <p className="text-gray-600">
                  We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Services, us, or third parties, or for any other reason.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Purchasing and Bidding */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiShoppingBag className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchasing and Bidding</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Listings</h3>
                <p className="text-gray-600 mb-4">
                  We strive to provide accurate product descriptions, pricing, and availability information. However, we do not warrant that product descriptions or other content on the Services are accurate, complete, reliable, current, or error-free.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bidding Rules</h3>
                <p className="text-gray-600 mb-4">
                  When participating in auctions on our platform:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>All bids are binding offers to purchase the item at the bid price</li>
                  <li>You may not retract a bid once it has been placed</li>
                  <li>If you are the winning bidder, you are obligated to complete the purchase</li>
                  <li>We reserve the right to cancel bids that we believe are fraudulent or made in bad faith</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Acceptance</h3>
                <p className="text-gray-600">
                  Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to limit or cancel quantities purchased per person, per household, or per order, or to refuse service to anyone at any time at our sole discretion.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payments and Fees */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiCreditCard className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payments and Fees</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                <p className="text-gray-600 mb-4">
                  All prices are shown in US Dollars (USD) unless otherwise specified. Prices are subject to change without notice. We are not responsible for typographical errors regarding price or any other matter.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Methods</h3>
                <p className="text-gray-600 mb-4">
                  We accept various payment methods as indicated on our website. By providing a payment method, you represent that you are authorized to use the payment method and you authorize us to charge your payment method for any orders you place.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fees and Taxes</h3>
                <p className="text-gray-600">
                  You are responsible for paying all fees and taxes associated with your use of the Services. Shipping fees, handling charges, and sales tax will be added to your order total where applicable and will be clearly indicated during the checkout process.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prohibited Activities */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiAlertTriangle className="text-red-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Activities</h2>
                <p className="text-gray-600 mb-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law</li>
                  <li>Violating or infringing upon the rights of others, including intellectual property rights</li>
                  <li>Attempting to circumvent any security features of the Services</li>
                  <li>Engaging in shill bidding or other fraudulent bidding practices</li>
                  <li>Submitting false or misleading information</li>
                  <li>Using the Services to distribute unsolicited commercial messages ("spam")</li>
                  <li>Interfering with or disrupting the Services or servers or networks connected to the Services</li>
                  <li>Impersonating or attempting to impersonate another user or person</li>
                  <li>Harvesting or collecting email addresses or other contact information of other users</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Intellectual Property */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiGlobe className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Intellectual Property</h3>
                <p className="text-gray-600 mb-4">
                  The Services and their original content, features, and functionality are owned by Mazadi and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">License to Use</h3>
                <p className="text-gray-600 mb-4">
                  We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Services for their intended purposes subject to these Terms. You may not:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Modify, copy, or create derivative works based on the Services</li>
                  <li>Use any data mining, robots, or similar data gathering and extraction methods</li>
                  <li>Download or copy any account information for the benefit of another merchant</li>
                  <li>Use any meta tags or any other "hidden text" utilizing our name or trademarks</li>
                  <li>Attempt to gain unauthorized access to any portion of the Services</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about our Terms & Conditions, please contact our legal team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsConditions
