// src/redux/sellerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSellerItems, deleteItem } from '../api';

export const getSellerItems = createAsyncThunk(
  'sellers/getSellerItems',
  async (userId) => {
    const items = await fetchSellerItems(userId);
    return items;
  }
);

export const removeItem = createAsyncThunk(
  'sellers/removeItem',
  async ({ userId, itemId }) => {
    await deleteItem(userId, itemId);
    return itemId; // Return itemId for further processing
  }
);

const sellerSlice = createSlice({
  name: 'sellers',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSellerItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSellerItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Update state with fetched items
      })
      .addCase(getSellerItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload); // Remove item from state
      });
  },
});

export default sellerSlice.reducer;
