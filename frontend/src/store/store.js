import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { channelsApi } from '/src/api/channels.js';
import { messagesApi } from '/src/api/messages.js';
import { errorMiddleware } from '/src/api/errorMiddleware.js';
import { app } from '/src/store/slices/app.js';
import { auth } from '/src/store/slices/auth.js';
import { channels } from '/src/store/slices/channels.js';

const reducers = combineReducers({
  channels,
  auth,
  app,
  [channelsApi.reducerPath]: channelsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware, errorMiddleware),
});
