import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import responsiveReducer from "./responsiveSlice.js";

// for persists socket
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
   user:userReducer,
   message:messageReducer,
   socket:socketReducer,
   responsive:responsiveReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer:persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;