import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiShoppingCart, FiAward, FiClock } from 'react-icons/fi'
import { HiOutlineShoppingCart, HiOutlineLightBulb } from 'react-icons/hi'
import { FcElectronics, FcElectroDevices } from 'react-icons/fc'
import AuctionCard from '../components/ui/AuctionCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import Testimonials from '../components/Testimonials'
import { getActiveAuctions } from '../services/auctionService'
import { AuctionContext } from '../context/AuctionContext'

const Home = () => {
  const { activeAuctions } = useContext(AuctionContext)
  const [featuredAuctions, setFeaturedAuctions] = useState([])
  const [recentAuctions, setRecentAuctions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const auctionsData = await getActiveAuctions()

        // Get featured auctions (first 4 active auctions)
        setFeaturedAuctions(auctionsData?.slice(0, 4) || [])

        // Get recent auctions (next 8 auctions)
        setRecentAuctions(auctionsData?.slice(4, 12) || [])
      } catch (error) {
        console.error('Error fetching auction data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
        </div>

        {/* Animated Particles - Reduced number */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-8 md:py-10 relative z-10 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-md"
            >
              <motion.div
                className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm mb-2 text-[10px]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="font-medium flex items-center">
                  <FiAward className="mr-1 text-yellow-300 w-3 h-3" /> The Arab World's Premier Electronics Auction Platform
                </span>
              </motion.div>

              <motion.h1
                className="text-2xl md:text-3xl font-bold mb-2 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Bid, Win, and Save on Premium Electronics
              </motion.h1>

              <motion.p
                className="text-xs md:text-sm mb-3 text-white/90 max-w-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Mazadi connects you with certified quality electronics through transparent auctions.
                Find amazing deals on smartphones, laptops, and more with our customer-first approach.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Link to="/auctions">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-primary-600 hover:bg-gray-100"
                    icon={<HiOutlineShoppingCart className="w-3 h-3" />}
                    iconPosition="left"
                  >
                    Browse Auctions
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="border border-white/50 text-white hover:bg-white/10"
                    icon={<HiOutlineLightBulb className="w-3 h-3" />}
                    iconPosition="left"
                  >
                    How It Works
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="mt-4 grid grid-cols-3 gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div>
                  <div className="text-base font-bold text-white">500+</div>
                  <div className="text-[10px] text-white/70">Active Auctions</div>
                </div>
                <div>
                  <div className="text-base font-bold text-white">10k+</div>
                  <div className="text-[10px] text-white/70">Happy Customers</div>
                </div>
                <div>
                  <div className="text-base font-bold text-white">99%</div>
                  <div className="text-[10px] text-white/70">Satisfaction Rate</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative max-w-xs mx-auto">
                {/* Main Image - More Compact */}
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow-md border border-white/10">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300">
                        <FcElectronics className="w-8 h-8 mx-auto" />
                        <p className="text-center text-white text-xs font-medium">Smartphones</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300">
                        <FcElectroDevices className="w-8 h-8 mx-auto" />
                        <p className="text-center text-white text-xs font-medium">Laptops</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300">
                        <FcElectroDevices className="w-8 h-8 mx-auto" />
                        <p className="text-center text-white text-xs font-medium">Tablets</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300">
                        <FcElectronics className="w-8 h-8 mx-auto" />
                        <p className="text-center text-white text-xs font-medium">Accessories</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - Smaller */}
                <motion.div
                  className="absolute -top-2 -right-2 bg-yellow-500 text-white px-1.5 py-0.5 rounded-full shadow-sm text-xs"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-bold text-[10px]">HOT DEALS</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 bg-green-500 text-white px-1.5 py-0.5 rounded-full shadow-sm text-xs"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="font-bold text-[10px]">BID NOW</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Live Auctions Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Live Auctions</h2>
            <Link to="/auctions" className="text-primary-600 hover:text-primary-700 flex items-center">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : featuredAuctions.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {featuredAuctions.map((auction) => (
                <motion.div key={auction._id} variants={itemVariants}>
                  <AuctionCard auction={auction} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FiClock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No active auctions</h3>
              <p className="mt-1 text-sm text-gray-500">
                Check back soon for new auction listings.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Auctions Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Auctions</h2>
            <Link to="/auctions" className="text-primary-600 hover:text-primary-700 flex items-center">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : recentAuctions.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {recentAuctions.map((auction) => (
                <motion.div key={auction._id} variants={itemVariants}>
                  <AuctionCard auction={auction} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg">
              <FiClock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No recent auctions</h3>
              <p className="mt-1 text-sm text-gray-500">
                Check back soon for new auction listings.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Auctions Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Upcoming Auctions</h2>
            <Link to="/auctions" className="text-primary-600 hover:text-primary-700 flex items-center">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Stay tuned for upcoming auctions!</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
                We're constantly adding new exciting auctions. Subscribe to our newsletter to be notified when new auctions are scheduled.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <Testimonials />
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <NewsletterSubscribe />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Us</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center hover-lift"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We ensure that all our products meet the highest quality standards.</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center hover-lift"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly and efficiently to your doorstep.</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center hover-lift"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Your transactions are protected with the latest security measures.</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center hover-lift"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is always ready to assist you.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
