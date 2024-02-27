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
    addProduct: builder.query({
      query: (product) => ({
        url: "product",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: product,
      }),
      providesTags: ["Products"],
    }),
    editProduct: builder.query({
      query: (product) => ({
        url: `product/${product.id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: product,
      }),
      providesTags: ["Products"],
    }),
    deleteProduct: builder.query({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductQuery,
  useEditProductQuery,
  useDeleteProductQuery,
} = productApi;
export default productApi;
