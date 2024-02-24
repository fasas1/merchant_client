import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import url from "./url";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url + "api",
  }),

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
export default orderApi;
