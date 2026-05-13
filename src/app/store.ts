// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { supabaseApi } from '../services/supabaseApi';

export const store = configureStore({
  reducer: {
    // add reducer of RTK Query
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  // add middleware for caching, invalidation, and polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;