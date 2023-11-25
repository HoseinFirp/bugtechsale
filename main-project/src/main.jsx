import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from "./features/cart/cartSlice";
// import store from "./Redux/store";

import userReducer from "./features/user/userSlice";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// import userReducer from "./Redux/store/users"

const persistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    cart: cartReducer,
  },
});

const persistor = persistStore(store);

export default store;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
