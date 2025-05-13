import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginUser, registerUser, checkAuth } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const userData = await checkAuth()
          if (userData) {
            setUser(userData)
            setIsAuthenticated(true)
            setIsAdmin(userData.userRole === 1)
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const data = await loginUser({ email, password })
      if (data.token) {
        localStorage.setItem('token', data.token)
        setUser(data.user)
        setIsAuthenticated(true)
        setIsAdmin(data.user.userRole === 1)
        toast.success('Login successful!')
        navigate('/')
        return true
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const data = await registerUser(userData)
      if (data.success) {
        toast.success('Registration successful! Please login.')
        navigate('/login')
        return true
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
