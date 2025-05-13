import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiMail, FiGift, FiTag, FiPercent, FiCheckCircle } from 'react-icons/fi';
import { FcElectronics, FcElectroDevices } from 'react-icons/fc';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row relative"
    >
      {/* Background Elements - Similar to hero section */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
      </div>

      {/* Animated Particles - Like hero section */}
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

      <div className="p-8 md:p-10 flex-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm mb-2 text-[10px] text-white">
            <span className="font-medium flex items-center">
              <FiGift className="mr-1 text-yellow-300 w-3 h-3" /> Special Offer
            </span>
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight"
        >
          Get 20% Off Your First Purchase
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-xs md:text-sm mb-3 text-white/90 max-w-sm"
        >
          Sign up for our newsletter and receive a special discount code for your first order. Limited time offer!
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400 w-3 h-3" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-8 w-full px-3 py-2 text-xs rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-3 py-2 text-xs bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden md:flex md:w-2/5 p-6 self-center justify-center items-center relative"
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
            <span className="font-bold text-[10px]">20% OFF</span>
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -left-2 bg-green-500 text-white px-1.5 py-0.5 rounded-full shadow-sm text-xs"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <span className="font-bold text-[10px]">SUBSCRIBE</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsletterSubscribe;
