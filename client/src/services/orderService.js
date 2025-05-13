import apiClient from './apiClient'

export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/order/create-order', orderData)
    return response
  } catch (error) {
    throw error
  }
}

export const getUserOrders = async () => {
  try {
    const response = await apiClient.get('/order/get-all-orders')
    return response.orders
  } catch (error) {
    throw error
  }
}

export const getOrderDetails = async (orderId) => {
  try {
    const response = await apiClient.post('/order/order-detail', { oId: orderId })
    return response.order
  } catch (error) {
    throw error
  }
}
