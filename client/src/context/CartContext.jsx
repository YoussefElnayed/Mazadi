import { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCartItems(parsedCart)
    }
  }, [])

  useEffect(() => {
    // Calculate total price and items
    const { total, items } = cartItems.reduce(
      (acc, item) => {
        acc.total += item.pPrice * item.quantity
        acc.items += item.quantity
        return acc
      },
      { total: 0, items: 0 }
    )
    
    setTotalPrice(total)
    setTotalItems(items)
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item._id === product._id)
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        toast.success('Cart updated!')
        return updatedItems
      } else {
        // Item doesn't exist, add new item
        toast.success('Added to cart!')
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item._id !== productId)
      toast.success('Item removed from cart')
      return updatedItems
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item._id === productId ? { ...item, quantity } : item
      )
      return updatedItems
    })
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
    toast.success('Cart cleared')
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
