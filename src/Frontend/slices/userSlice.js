// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState: { userInfo: null }, // Initial state
  reducers: {
    setUser: (state, action) => {
      // Set user information on login
      state.userInfo = action.payload;
    },
    logout: (state) => {
      // Clear user information on logout
      state.userInfo = null;
    },
  },
});

// Export the actions generated from the slice
export const { setUser, logout } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
