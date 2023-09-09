import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { authApi, productApi, shoppingCartApi } from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice ";
import { userAuthReducer } from "./userAuthSlice"

const store = configureStore({
      reducer:{
           productReducer : productReducer,
           userAuthStore : userAuthReducer,
           shoppingCartStore: shoppingCartReducer,
           [productApi.reducerPath]: productApi.reducer,
           [authApi.reducerPath]: authApi.reducer,
           [shoppingCartApi.reducerPath] : shoppingCartApi.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware)
      .concat(shoppingCartApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
