import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { motion } from 'framer-motion'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}

export default MainLayout
