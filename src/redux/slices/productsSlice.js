import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    priceRange: [0, 1000000],
    metalType: [],
    polishType: [],
  },
  sortBy: 'latest',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    filterProducts: (state) => {
      let filtered = state.products.filter(product => {
        const withinPrice = product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1];
        const metalMatch = state.filters.metalType.length === 0 || state.filters.metalType.includes(product.metalType);
        const polishMatch = state.filters.polishType.length === 0 || state.filters.polishType.includes(product.polishType);
        return withinPrice && metalMatch && polishMatch;
      });

      // Sort products
      if (state.sortBy === 'latest') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (state.sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (state.sortBy === 'ratings') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      state.filteredProducts = filtered;
    },
  },
});

export const { 
  setProducts, 
  setCategories, 
  setSelectedProduct, 
  setLoading, 
  setError, 
  setFilters, 
  setSortBy, 
  filterProducts 
} = productsSlice.actions;
export default productsSlice.reducer;
