import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // Default: user is logged out
  user: null, // Will store user details after login
  authLoading: true, // New state to track authentication verification
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Store user data
      state.authLoading = false; // Authentication is complete
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.authLoading = false; // Ensure loading is reset
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload; // Control loading state manually
    },
  },
});

export const { login, logout,setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
