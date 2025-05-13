import apiClient from './apiClient'

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get('/category/all-category')
    return response.categories
  } catch (error) {
    throw error
  }
}
