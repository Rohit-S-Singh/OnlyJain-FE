import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './slices';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ["yourReducerName"], // Optionally specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
