import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@reducers/rootReducer";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

const preloadedState = {
  auth: {},
  orders: {
    list: {},
    details: {},
    summary: {},
  },
  customers: {
    list: {},
    details: {},
  },
  assignment: {
    list: {},
    details: {},
  },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
  whitelist: [
    "servicesReducer",
    "personInformationReducer",
    "servicesReducer",
    "klarnaReducer",
    "authReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  middleware: [sagaMiddleware],
});
