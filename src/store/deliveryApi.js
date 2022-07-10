import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const deliveryApi = createApi({
    reducerPath: "deliveryApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://delivery-app-max-server.herokuapp.com/"}),

    endpoints: (build) => ({
        addOrder: build.mutation({
            query: (body) => ({
                url: "orders/",
                method: "POST",
                body,
            })
        }),
        getShops: build.query({
            query: ()=> "shops"
        }),
        getGoods: build.query({
            query: (shopName) => `goods/?shop=${shopName}`
        }),
        getOrderById: build.query({
            query:(id)=>`ordersById/?id=${id}`
        }),
        getOrdersByContacts: build.query({
            query: (text) => `ordersByPhone/?phone=${text}`
        })
    })

})

export const {useAddOrderMutation, useGetShopsQuery, useGetGoodsQuery,useGetOrderByIdQuery, useGetOrdersByContactsQuery} = deliveryApi