import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from '/src/store/slices/auth.js';

export const errorMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { status } = action.payload;
    if (status === 401) {
      store.dispatch(logout());
    }
  }

  return next(action);
};
