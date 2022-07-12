import {configureStore} from '@reduxjs/toolkit';
import {deliveryApi} from "./deliveryApi";


export default configureStore({
    reducer: {
        [deliveryApi.reducerPath]: deliveryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deliveryApi.middleware)
})