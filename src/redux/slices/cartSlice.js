import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      cartSlice.caseReducers.calculateTotal(state);
    },
    updateCartItem: (state, action) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item._id !== action.payload.id);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
      cartSlice.caseReducers.calculateTotal(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    },
    calculateTotal: (state) => {
      state.totalPrice = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
