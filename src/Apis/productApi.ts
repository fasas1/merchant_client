import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import url from "./url";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url + "api",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "product",
      }),
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `product/${id}`,
      }),
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "product",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    editProduct: builder.mutation({
      query: (product) => ({
        url: `product/${product.id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;
export default productApi;
