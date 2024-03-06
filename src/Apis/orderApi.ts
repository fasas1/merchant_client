import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import url from "./url";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url + "api",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: "order",
      }),
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery, useAddOrderMutation } =
  orderApi;
export default orderApi;
