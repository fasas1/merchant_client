import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartItemModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  Container,
  CardContent,
  Typography,
} from "@mui/material";
import { useGetOrdersQuery } from "../../../Apis/orderApi";

function OrderSummary() {
    const [paymentStatus, setPaymentStatus] = useState<null | string>(null);
    const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
    const [loading, setLoading] = useState(false);
    // const { data: orders, isLoading, isError } = useGetOrdersQuery({
    //   status: 'completed',
    // });
    
    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
      );
      
    const initialUserData ={
        name: "userData.Fullname",
        email:"userData.email",
        phoneNumber:""
     };
     let grandTotal =0;
     let formatPrice;
  
     shoppingCartFromStore?.map((cartItem:cartItemModel) =>{
        
         grandTotal +=  (cartItem.product?.price ?? 0) * (cartItem.quantity ?? 0);
         formatPrice =  formatNumberToThousands(grandTotal);
         return null;
     })
     function formatNumberToThousands(number: number): string {
        const numStr = number.toString();
        const [wholePart, decimalPart] = numStr.split(".");
        const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formattedNumber = decimalPart
          ? `${formattedWholePart}.${decimalPart}`
          : formattedWholePart;
        return formattedNumber;
      }

      const handlePayment = async () => {
        try {
          // Replace 'YOUR_BACKEND_ENDPOINT' with the actual URL of your .NET backend endpoint for initiating payments.
          const response = await fetch('https://localhost:7147/api/payment/makePayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Include payment details here, e.g., amount, email, callback URL, etc.
              amount: grandTotal * 100, // Convert amount to kobo (if required)
              email: userData.email,
              fullName:userData.fullName,
              //userId:  // Assuming userId is the correct property
         
            }),
          });
    
        
    if (response.ok) {
        const paymentData = await response.json();
        
        if (paymentData && paymentData.authorizationUrl)  {
          // Redirect the user to the PayStack payment page or handle as needed.
          window.location.href = paymentData.authorizationUrl;

          // const orderDetailsDTO = [];
          // shoppingCartFromStore.forEach((item) => {
          //   const temporderDetails = {
          //     productId: item.product?.id,
          //     quantity: item.quantity,
          //     itemName: item.product?.name,
          //     price: item.product?.price,
          //   };
          //   orderDetailsDTO.push(temporderDetails);
          // });
          
        } else {
          console.error('Invalid response structure:', paymentData);
          setPaymentStatus('Invalid response structure');
        }
      } else {
        console.error('Failed to initiate payment');
        setPaymentStatus('Payment initiation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentStatus('An error occurred while processing your payment');
    }
  };
    
  return (
    <Container>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "60ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography>Order Preview</Typography>
        <TextField
          id="filled-basic"
          label="Name"
          variant="outlined"
          value={userData.fullName}
       
        />
        <TextField
          id="filled-basic"
          label="Email"
          variant="outlined"
          value={userData.email}
        
        />
      
        <Card>
          <CardContent style={{ background: "ghostwhite" }}>
            <Typography gutterBottom variant="h5" component="div">
             Total Price: <span>&#8358;</span>{formatPrice}
            </Typography>
           
          </CardContent>
        </Card>

        <Button
          variant="contained"
          color="secondary"
          sx={{ color: "white", marginTop: 2 }}
          onClick={handlePayment}
          // disabled={loading}
          // onClick={(e) => handleSubmit(e)}
        >
          {" "}
          Make Payment
        </Button>
        {paymentStatus && <p>{paymentStatus}</p>}
      </Box>
    </Container>
  );
}

export default OrderSummary;
