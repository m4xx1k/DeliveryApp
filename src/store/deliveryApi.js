import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const deliveryApi = createApi({
    reducerPath: "deliveryApi",
    baseQuery: fetchBaseQuery({baseUrl: `${window.location.pathname}:3002/`}),

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
            query: (shopName) => `goods?q=${shopName}`
        }),
        getOrderById: build.query({
            query:(id)=>`orders/${id}`
        }),
        getOrdersByContacts: build.query({
            query: (text) => `orders?q=${text}`
        })
    })

})

export const {useAddOrderMutation, useGetShopsQuery, useGetGoodsQuery,useGetOrderByIdQuery, useGetOrdersByContactsQuery} = deliveryApi