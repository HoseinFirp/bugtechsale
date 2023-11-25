import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./pages/cart/CartSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;

const dispatch = store.dispatch;

export { dispatch };
