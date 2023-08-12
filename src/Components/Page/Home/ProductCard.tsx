import React from 'react'
import Toolbar from '@mui/material/Toolbar';
//import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { productModel } from '../../../Interfaces';
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GiShoppingCart } from "react-icons/gi";
import {Link } from "react-router-dom";


interface Props {
    product : productModel
}
interface ProductProps {
  product: {
    price: number;
  };
}

function formatNumberToThousands(number: number): string {
  const numStr = number.toString();
  const [wholePart, decimalPart] = numStr.split('.');
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedNumber = decimalPart
    ? `${formattedWholePart}.${decimalPart}`
    : formattedWholePart;
  return formattedNumber;
}

function ProductCard(props : Props) {
  const formattedPrice = formatNumberToThousands(props.product.price);

 
  return (
    <Box component="main" >
    <Toolbar />   
        <Card>
            <CardHeader
             avatar={
              <IconButton aria-label="add to favorites"  sx={{color:'#FAA205' }}>
              <FavoriteIcon />
            </IconButton>
            }
            action={
              <IconButton aria-label="settings" sx={{ background: "#E7F5FF",color:'red' }}>
               <GiShoppingCart/>
              </IconButton>
            }
            />
            <Link to={`/productDetails/${props.product.id}`}>
             <CardMedia
        component="img"
        height="289"
         sx={{ 
          cursor:'pointer',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.1)', // Apply a scale effect on hover
          },
        }}
      src={props.product.image}
      />
      </Link>
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
        {props.product.name}
          </Typography>
        <Typography variant="body2" color="text.secondary">
           {props.product.description.slice(0, 50)}....
          
        </Typography>
        <Typography gutterBottom variant="h5" component="div"sx={{ textAlign: 'center', m: 1 }}>
             <span>&#8358;</span>{formattedPrice}
          </Typography>
      </CardContent>
      
          </Card>
     
 </Box>
  )
}

export default ProductCard