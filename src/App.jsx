import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

// Components
import PrivateRoute from './components/PrivateRoute';
import Layout from './layouts/MainLayout';

// Styles
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <Layout>
                <ProductDetailsPage />
              </Layout>
            }
          />
          <Route
            path="/categories"
            element={
              <Layout>
                <CategoriesPage />
              </Layout>
            }
          />
          <Route
            path="/categories/:id"
            element={
              <Layout>
                <CategoryProductsPage />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <CartPage />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <PrivateRoute>
                  <OrdersPage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <Layout>
                <PrivateRoute>
                  <OrderDetailsPage />
                </PrivateRoute>
              </Layout>
            }
          />

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
