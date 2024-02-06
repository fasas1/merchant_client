import React from 'react'
import {
  Box,
  Grid,
  TextField,
  Toolbar,
  Typography,
  Button,
  
} from "@mui/material";
import CardImage from "../Assets/CardImage.png"
import { OrderSummary } from '../Components/Page/Order';


function Payment() {
  return (
    <Box sx={{ p: 4 }}>
    <Toolbar />
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
       <OrderSummary/>
        </Grid>
   
      <Grid item xs={12} md={5}>
      <img
         src={CardImage}
          alt="Card Payment"
          style={{ width: "70%", paddingTop: "50px"}}
          />
      </Grid>
      </Grid>
    </Box>
  )
}

export default Payment