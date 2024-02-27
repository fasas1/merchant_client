import { createSlice } from "@reduxjs/toolkit";
import { productModel } from "../../Interfaces";

const initialState: { product: productModel[] } = {
  product: [],
};

export const productSlice = createSlice({
  name: "Product",
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
