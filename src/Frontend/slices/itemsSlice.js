// src/slices/itemsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure } = itemsSlice.actions;
export default itemsSlice.reducer;
