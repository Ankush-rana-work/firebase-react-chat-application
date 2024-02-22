
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import manageReducer from './slice/manageSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


// making combine reducers
export const rootReducers = combineReducers({
  auth: persistReducer({key: "auth", storage }, authReducer),
  manage: persistReducer({key: "manage", storage }, manageReducer),
});

export const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.REACT_APP_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).concat([]),
});

export const persistor = persistStore(store);