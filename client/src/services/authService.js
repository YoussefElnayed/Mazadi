import apiClient from './apiClient'

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/signin', credentials)
    return response
  } catch (error) {
    throw error
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/signup', userData)
    return response
  } catch (error) {
    throw error
  }
}

export const checkAuth = async () => {
  try {
    const response = await apiClient.get('/user/profile')
    return response.user
  } catch (error) {
    throw error
  }
}

export const checkIsAdmin = async () => {
  try {
    const response = await apiClient.post('/isadmin')
    return response.isAdmin
  } catch (error) {
    throw error
  }
}
