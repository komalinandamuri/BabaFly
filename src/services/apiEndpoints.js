import axiosInstance from './api';

// Auth APIs
export const authAPI = {
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }),
  register: (userData) => axiosInstance.post('/auth/register', userData),
  logout: () => axiosInstance.post('/auth/logout'),
};

// Products APIs
export const productsAPI = {
  getProducts: (params) => axiosInstance.get('/products', { params }),
  getProductById: (id) => axiosInstance.get(`/products/${id}`),
  searchProducts: (query) => axiosInstance.get('/products/search', { params: { query } }),
};

// Categories APIs
export const categoriesAPI = {
  getCategories: () => axiosInstance.get('/categories'),
  getCategoryById: (id) => axiosInstance.get(`/categories/${id}`),
  getCategoryProducts: (categoryId, params) => 
    axiosInstance.get(`/categories/${categoryId}/products`, { params }),
};

// Cart APIs (Frontend only, but keeping for reference)
export const cartAPI = {
  getCart: () => axiosInstance.get('/cart'),
  addToCart: (productId, quantity) => 
    axiosInstance.post('/cart/add', { productId, quantity }),
  removeFromCart: (productId) => 
    axiosInstance.delete(`/cart/${productId}`),
};

// Orders APIs
export const ordersAPI = {
  getOrders: () => axiosInstance.get('/orders'),
  getOrderById: (id) => axiosInstance.get(`/orders/${id}`),
  createOrder: (orderData) => axiosInstance.post('/orders', orderData),
  updateOrder: (id, data) => axiosInstance.put(`/orders/${id}`, data),
};

// Filter APIs
export const filtersAPI = {
  getMetalTypes: () => axiosInstance.get('/filters/metal-types'),
  getPolishTypes: () => axiosInstance.get('/filters/polish-types'),
  getPriceRange: () => axiosInstance.get('/filters/price-range'),
};
