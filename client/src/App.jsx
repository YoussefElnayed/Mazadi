import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { AuctionProvider } from './context/AuctionContext'

// Layout Components
import MainLayout from './components/layout/MainLayout'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" color="primary" />
  </div>
)

// Eagerly loaded pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

// Lazy loaded pages
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Shipping = lazy(() => import('./pages/Shipping'))
const Returns = lazy(() => import('./pages/Returns'))
const PaymentMethods = lazy(() => import('./pages/PaymentMethods'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const Auctions = lazy(() => import('./pages/Auctions'))
const AuctionDetail = lazy(() => import('./pages/AuctionDetail'))

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AuctionProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Products />
                </Suspense>
              } />
              <Route path="products/:id" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ProductDetail />
                </Suspense>
              } />
              <Route path="auctions" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Auctions />
                </Suspense>
              } />
              <Route path="auctions/:id" element={
                <Suspense fallback={<LoadingFallback />}>
                  <AuctionDetail />
                </Suspense>
              } />
              <Route path="cart" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Cart />
                </Suspense>
              } />
              <Route path="wishlist" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Wishlist />
                </Suspense>
              } />
              <Route path="checkout" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Checkout />
                </Suspense>
              } />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard/*" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="about" element={
                <Suspense fallback={<LoadingFallback />}>
                  <About />
                </Suspense>
              } />
              <Route path="contact" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Contact />
                </Suspense>
              } />
              <Route path="faq" element={
                <Suspense fallback={<LoadingFallback />}>
                  <FAQ />
                </Suspense>
              } />
              <Route path="shipping" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Shipping />
                </Suspense>
              } />
              <Route path="returns" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Returns />
                </Suspense>
              } />
              <Route path="payment-methods" element={
                <Suspense fallback={<LoadingFallback />}>
                  <PaymentMethods />
                </Suspense>
              } />
              <Route path="track-order" element={
                <Suspense fallback={<LoadingFallback />}>
                  <TrackOrder />
                </Suspense>
              } />
              <Route path="privacy-policy" element={
                <Suspense fallback={<LoadingFallback />}>
                  <PrivacyPolicy />
                </Suspense>
              } />
              <Route path="terms-conditions" element={
                <Suspense fallback={<LoadingFallback />}>
                  <TermsConditions />
                </Suspense>
              } />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuctionProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
