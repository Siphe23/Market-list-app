// src/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Optional: Update the quantity if needed or avoid adding duplicates
        existingItem.quantity = (existingItem.quantity || 1) + 1; // Assuming you want to track quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
