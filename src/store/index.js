import {configureStore} from '@reduxjs/toolkit';
import CartReducer from "./CartSlice";
import {deliveryApi} from "./deliveryApi";


export default configureStore({
    reducer: {
        cart: CartReducer,
        [deliveryApi.reducerPath]: deliveryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deliveryApi.middleware)
})