import apiClient from './apiClient'

export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/product/all-product')
    return response.products
  } catch (error) {
    throw error
  }
}

export const getProductById = async (productId) => {
  try {
    const response = await apiClient.post('/product/single-product', { pId: productId })
    return response.product
  } catch (error) {
    throw error
  }
}

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await apiClient.post('/product/product-by-category', { catId: categoryId })
    return response.products
  } catch (error) {
    throw error
  }
}

export const getProductsByPrice = async (range) => {
  try {
    const response = await apiClient.post('/product/product-by-price', range)
    return response.products
  } catch (error) {
    throw error
  }
}

export const addProductReview = async (reviewData) => {
  try {
    const response = await apiClient.post('/product/add-review', reviewData)
    return response
  } catch (error) {
    throw error
  }
}

export const deleteProductReview = async (reviewData) => {
  try {
    const response = await apiClient.post('/product/delete-review', reviewData)
    return response
  } catch (error) {
    throw error
  }
}
