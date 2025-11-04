import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { auth } from './slices/auth';
import { channels } from './slices/channels';
import { channelsApi } from '../api/channels.js';
import { messagesApi } from '../api/messages.js';

const reducers = combineReducers({
  channels,
  auth,
  [channelsApi.reducerPath]: channelsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware),
});
