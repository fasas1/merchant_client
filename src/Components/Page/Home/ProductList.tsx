import React from "react";
import { useEffect } from "react";
import { productModel } from "../../../Interfaces";
import { useGetProductsQuery } from "../../../Apis/productApi";
import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../Storage/Redux/productSlice";
import Skeleton from "@mui/material/Skeleton";
import { Stack, Toolbar } from "@mui/material";

function ProductList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsQuery(null);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setProduct(data.result));
    }
  }, [isLoading, data, dispatch]);

  if (isLoading) {
    return (
      <div>
        <Box component="main" sx={{ p: 4 }}>
          <Toolbar />
          <Stack>
            <Skeleton
              variant="rectangular"
              width={310}
              height={218}
              animation="wave"
            />
            <Skeleton />
            <Skeleton width="60%" />
          </Stack>
          <Stack>
            <Skeleton
              variant="rectangular"
              width={310}
              height={218}
              animation="wave"
            />
            <Skeleton />
            <Skeleton width="60%" />
          </Stack>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Box component="main" sx={{ p: 3, display: "flex" }}>
        <Grid container spacing={2}>
          {data && data.result && data.result.length > 0 ? (
            data.result.map((product: productModel, index: number) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <div>No products available.</div>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default ProductList;
