import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartItemModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import TextField from "@mui/material/TextField";
import {
  Box,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  removeFromCart,
  updateQuantity,
} from "../../../Storage/Redux/shoppingCartSlice ";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { MiniLoader } from "../Common";

function CartSummary() {
  const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  if (!shoppingCartFromStore) {
    return <div>Cart Empty</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  const handleQuantity = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    if (
      (updateQuantityBy == -1 && cartItem.quantity == 1) ||
      updateQuantityBy == 0
    ) {
      //Remove Item
      updateShoppingCart({
        productId: cartItem.product?.id,
        updateQuantityBy: 0,
        userId: userData.id,
      });
      dispatch(removeFromCart({ cartItem, quantity: 0 }));
    } else {
      //Update quantity with newquantity
      updateShoppingCart({
        productId: cartItem.product?.id,
        updateQuantityBy: updateQuantityBy,
        userId: userData.id,
      });
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>

                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shoppingCartFromStore.map(
                  (cartItem: cartItemModel, index: number) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Box display="flex" alignItems="center">
                          <img
                            src={cartItem.product?.image}
                            alt="product-image"
                            style={{ height: 70, marginRight: 20 }}
                          />
                          <span> {cartItem.product?.name}</span>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <span>&#8358;</span>
                        {cartItem.product?.price?.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleQuantity(-1, cartItem);
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        {cartItem.quantity}
                        <IconButton
                          onClick={() => {
                            handleQuantity(1, cartItem);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <span>&#8358;</span>
                        {cartItem.quantity! * cartItem.product!.price}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            handleQuantity(0, cartItem);
                          }}
                        >
                          <DeleteOutlineIcon style={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            <Typography>Pickup Details</Typography>
            <TextField
              id="filled-basic"
              label="Fullname"
              variant="outlined"
              required
            />
            <TextField
              id="filled-basic"
              label="Email"
              variant="outlined"
              required
            />
            <TextField
              id="standard-basic"
              label="Phone number"
              variant="outlined"
              required
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: "white" }}
              disabled={loading}
            >
              {" "}
              {loading ? <MiniLoader /> : "Looks Good? Place Order!"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartSummary;
