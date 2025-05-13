import { motion } from 'framer-motion'
import { FiShield, FiLock, FiUser, FiDatabase, FiGlobe, FiClock } from 'react-icons/fi'

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
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
                <FiShield className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Mazadi ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-gray-600">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services. By accessing our website and using our services, you consent to the collection, use, and disclosure of information in accordance with this policy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Information We Collect */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiUser className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect several types of information from and about users of our website and services, including:
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600 mb-4">
                  Personal information is data that can be used to identify you individually. This may include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                  <li>Name, email address, phone number, and mailing address</li>
                  <li>Billing information and payment details</li>
                  <li>User account credentials</li>
                  <li>Date of birth and gender</li>
                  <li>Profile pictures and other content you choose to upload</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Non-Personal Information</h3>
                <p className="text-gray-600 mb-4">
                  We also collect non-personal information that does not directly identify you, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>IP address and general location</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring websites and search terms</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How We Use Your Information */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiDatabase className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                
                <ul className="list-disc pl-5 space-y-3 text-gray-600">
                  <li>
                    <span className="font-medium text-gray-900">Providing and Improving Our Services:</span> To process transactions, maintain your account, provide customer support, and enhance your user experience.
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Communication:</span> To respond to your inquiries, send service updates, marketing communications, and promotional offers.
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Personalization:</span> To personalize your experience and deliver content and product offerings relevant to your interests.
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Analytics:</span> To analyze usage patterns, conduct research, and improve our website and services.
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Security:</span> To protect our website, services, and users from fraud, unauthorized access, and other security threats.
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Legal Compliance:</span> To comply with applicable laws, regulations, and legal processes.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cookies and Tracking Technologies */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiGlobe className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to collect information about your browsing activities and to improve your experience on our website. These technologies help us:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you interact with our website</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Analyze the performance of our website and services</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
                
                <p className="text-gray-600 mb-4">
                  You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                </p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <p className="text-gray-700">
                    For more information about our use of cookies, please see our <a href="#" className="text-primary-600 hover:underline">Cookie Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Security */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiLock className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                  <li>Encryption of sensitive data</li>
                  <li>Secure networks and servers</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Employee training on data protection</li>
                </ul>
                
                <p className="text-gray-600">
                  While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security of your data.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Retention */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <FiClock className="text-primary-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>The length of time we have an ongoing relationship with you</li>
                  <li>Legal obligations to which we are subject</li>
                  <li>Whether retention is advisable in light of our legal position</li>
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
            <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about our Privacy Policy, please contact our Data Protection Officer.
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

export default PrivacyPolicy
