import { motion } from 'framer-motion'
import { FiUsers, FiPackage, FiTruck, FiAward } from 'react-icons/fi'

const About = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">About Mazadi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted online marketplace for quality products at unbeatable prices.
          </p>
        </motion.div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Mazadi was founded on a simple yet powerful idea: to transform how people buy and sell electronic devices in the Arab world. What began as a small group of tech enthusiasts has evolved into the leading online auction platform for smartphones, laptops, tablets, and more.
                </p>
                <p className="text-gray-600 mb-4">
                  At Mazadi, we believe that everyone deserves access to top-quality electronics at fair prices. By combining a competitive bidding system with real-time market insights, we make it easy to discover, evaluate, and win the exact device you want—whether you are upgrading your gear or seeking a great deal on a pre-owned model.
                </p>
                <p className="text-gray-600">
                  Our journey is guided by three core principles: transparency in every transaction, innovation in every feature, and a community of buyers and sellers who share our passion for electronics. Join us and experience auctions designed for today's tech lovers.
                </p>
              </motion.div>
            </div>
            <div className="bg-primary-600 flex items-center justify-center">
              <motion.img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                alt="Team working together"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Customer First</h3>
              <p className="text-gray-600 text-center">
                We put you at the heart of everything we do—intuitive search, clear bidding steps and 24/7 support—so your Mazadi experience is seamless from "login" to "you've won."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Quality Products</h3>
              <p className="text-gray-600 text-center">
                Every listing goes through our expert review: device condition, genuine parts and accurate specs. No surprises—only peace of mind that you're getting exactly what you see.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Speed & Convenience</h3>
              <p className="text-gray-600 text-center">
                From instant bid alerts to express delivery options across the region, we make sure your new gadget reaches your hands faster than traditional marketplaces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Transparency & Trust</h3>
              <p className="text-gray-600 text-center">
                Real-time price trends, user ratings and detailed seller histories mean you always know where your bid stands—and why. We earn your trust through open data and rock-solid security.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "موقع مزادي هو اختياري الأول للتسوق أونلاين بقاله سنة. جودة المنتجات وخدمة العملاء ممتازة!",
                author: "Sarah Mohamed",
                location: "EG"
              },
              {
                quote: "بحب قد إيه من السهل ألاقي اللي بدور عليه على مزادي. الأسعار كويسة والتوصيل دايمًا في معاده.",
                author: "Ahmed Gamal",
                location: "EG"
              },
              {
                quote: "تنوع المنتجات على مزادي رهيب. عمري ما حصل وندمت على حاجة اشتريتها.",
                author: "Laila Khaled",
                location: "EG"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" dir="rtl">"{testimonial.quote}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Bidding?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers in the Arab world's premier electronics auction platform. Find amazing deals and bid on your favorite items today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/products"
              className="inline-block bg-white text-primary-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Auctions
            </a>
            <a
              href="/register"
              className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Create Account
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
