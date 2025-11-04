import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('user')) || {},
  reducers: {
    login: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
