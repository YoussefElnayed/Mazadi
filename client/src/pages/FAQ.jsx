import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: "How do I place a bid on an item?",
      answer: "To place a bid, navigate to the product page of the item you're interested in. Enter your bid amount in the bidding field and click 'Place Bid'. Make sure you're logged in to your account before bidding."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For more details, please visit our Payment Methods page."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'My Orders' section in your dashboard. There, you'll find tracking information for all your recent orders."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be returned in their original condition and packaging. Please visit our Returns & Exchanges page for more details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination. You can see the shipping options available during checkout."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "If you need to change or cancel your order, please contact our customer service team as soon as possible. We can usually accommodate changes if the order hasn't been processed yet."
    },
    {
      question: "Are the electronics new or refurbished?",
      answer: "We offer both new and certified refurbished electronics. Each product listing clearly states the condition of the item. All refurbished items undergo rigorous testing and come with a warranty."
    },
    {
      question: "How do I know if an item is authentic?",
      answer: "All products sold on Mazadi are verified for authenticity. We work directly with authorized retailers and trusted sellers. Each product undergoes a verification process before being listed on our platform."
    },
    {
      question: "What happens if I win an auction but change my mind?",
      answer: "Once you win an auction, you're obligated to complete the purchase. Failure to do so may result in account penalties. If you have exceptional circumstances, please contact our customer service team immediately."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team through multiple channels: by phone at 0800-1234-567, by email at support@mazadi.com, or through the contact form on our Contact page."
    }
  ]

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Mazadi's services, policies, and features.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  {openIndex === index ? (
                    <FiChevronUp className="text-primary-600 flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you couldn't find the answer to your question, our customer support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
