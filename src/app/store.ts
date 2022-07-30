import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});

export default store;
