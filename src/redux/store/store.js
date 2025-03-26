import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/counterSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})

export default store;