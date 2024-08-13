import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import  loginReducer  from "./reducers/auth/loginSlice";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import  mytransactionsSlice  from "./reducers/transaction/transactionSlice";
import isConfigurationEnabledReducer from './reducers/notification/notificationSlice';
import otpSlice from "./reducers/auth/otpSlice";
import verifyOTPSlice from "./reducers/auth/verifyOTPSlice";
const persistConfig = {
  key: "authentication",
  storage,
};
const middlewares = [];
if (process.env.NODE_ENV !== "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
const persistedReducer = persistReducer(persistConfig, loginReducer);
const rootReducer = combineReducers({
  userDetails: persistedReducer,
  otp:otpSlice,
  otpVerification:verifyOTPSlice,
  transactions:mytransactionsSlice,
  isConfigurationEnabled:isConfigurationEnabledReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(logger),
});

export default store;

export const persistor = persistStore(store);

