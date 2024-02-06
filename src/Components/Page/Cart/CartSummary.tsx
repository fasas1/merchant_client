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
  Card,
  CardContent,
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
import { useNavigate } from "react-router-dom";


function CartSummary() {
  const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const navigate = useNavigate();


  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  
  function formatNumberToThousands(number: number): string {
    const numStr = number.toString();
    const [wholePart, decimalPart] = numStr.split(".");
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedNumber = decimalPart
      ? `${formattedWholePart}.${decimalPart}`
      : formattedWholePart;
    return formattedNumber;
  }
 
  const initialUserData ={
     name: "userData.Fullname",
     email:"userData.email",
     phoneNumber:""
  };
   let grandTotal =0;
   let totalItems = 0;
   let formatPrice;

   shoppingCartFromStore?.map((cartItem:cartItemModel) =>{
       totalItems += cartItem.quantity ?? 0;
       grandTotal +=  (cartItem.product?.price ?? 0) * (cartItem.quantity ?? 0);
       formatPrice =  formatNumberToThousands(grandTotal);
       return null;
   })

  if (!shoppingCartFromStore) {
    return <div>Empty</div>;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
     console.log("Hittter");
   //const orderSummary = {grandTotal, totalItems}
    navigate("/payment")
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
            <Table sx={{ minWidth: 550 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>

                  <TableCell align="right">Price</TableCell>
                  {/* <TableCell align="center">Quantity</TableCell> */}
                  {/* <TableCell align="right">Subtotal</TableCell> */}
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
                            style={{ height: 80, marginRight: 20 }}
                          />
                          <span> {cartItem.product?.name}</span>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <span>&#8358;</span>
                        {cartItem.product?.price?.toFixed(2)}
                      </TableCell>
                      {/* <TableCell align="center">
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
                      </TableCell> */}
                      {/* <TableCell align="right">
                        <span>&#8358;</span>
                        { cartItem.product!.price}
                        {cartItem.quantity! * cartItem.product!.price}
                      </TableCell> */}
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
      
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            <Typography>Order Summary</Typography>
            <TextField
              id="filled-basic"
              label="Name"
              value={userData.fullName}
              variant="outlined"
              required
            />
            <TextField
              id="filled-basic"
              label="Email"
              value={userData.email}
              variant="outlined"
              required
            />
            {/* <TextField
              id="standard-basic"
              label="Phone number"
              variant="outlined"
              required
            /> */}
          <Card >
            <CardContent style={{background:"ghostwhite"}}>
            <Typography gutterBottom variant="h6" component="div">
              Grand Total:  <span>&#8358;</span> {formatPrice}
          </Typography>
          <Typography variant="body1" color="text.secondary">
              No of Items: {totalItems}
            </Typography>
            </CardContent>
          </Card>
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: "white" }}
              disabled={loading}
            onClick={(e) => handleSubmit(e)} 
            >
              {" "}
              {loading ? <MiniLoader /> : "Place Order!"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartSummary;
