import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiShoppingBag, FiUser, FiHeart, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { AuthContext } from '../context/AuthContext'
import { getUserOrders } from '../services/orderService'

// Dashboard Components
const Profile = () => {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user?.userImage ? (
            <img 
              src={`/uploads/users/${user.userImage}`} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <FiUser size={48} className="text-gray-400" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="text-gray-900">{user?.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
              <p className="text-gray-900">{user?.phoneNumber || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
              <p className="text-gray-900">{user?.userRole === 1 ? 'Admin' : 'Customer'}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const ordersData = await getUserOrders()
        setOrders(ordersData)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Not processed':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Order #{order._id.substring(0, 8)}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Amount:</span>
                  <span className="font-medium">${order.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Items:</span>
                  <span className="font-medium">{order.allProduct.length} items</span>
                </div>
                <div className="mt-4">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Order Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FiShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

const Wishlist = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
      
      <div className="text-center py-8">
        <FiHeart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-4">Save items you like to your wishlist and they'll appear here.</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { path: '/dashboard/orders', label: 'My Orders', icon: <FiShoppingBag /> },
    { path: '/dashboard/profile', label: 'My Profile', icon: <FiUser /> },
    { path: '/dashboard/wishlist', label: 'Wishlist', icon: <FiHeart /> },
  ]
  
  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true
    }
    if (path !== '/dashboard' && location.pathname.startsWith(path)) {
      return true
    }
    return false
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <span className="font-medium">Dashboard Menu</span>
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
          
          {/* Sidebar */}
          <motion.div
            className={`w-full md:w-64 bg-white rounded-lg shadow-md overflow-hidden ${
              isMobileMenuOpen ? 'block' : 'hidden md:block'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  {user?.userImage ? (
                    <img 
                      src={`/uploads/users/${user.userImage}`} 
                      alt={user.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FiUser className="text-primary-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                        isActive(item.path)
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span className="mr-3"><FiLogOut /></span>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>
          
          {/* Content */}
          <div className="flex-1">
            <Routes>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
