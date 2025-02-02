import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // Default: user is logged out
  user: null, // Will store user details after login
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Store user data
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
