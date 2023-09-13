import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
//import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { productModel, userModel } from "../../../Interfaces";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MiniLoader } from "../Common";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";

interface Props {
  product: productModel;
}
interface ProductProps {
  product: {
    price: number;
  };
}

function formatNumberToThousands(number: number): string {
  const numStr = number.toString();
  const [wholePart, decimalPart] = numStr.split(".");
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedNumber = decimalPart
    ? `${formattedWholePart}.${decimalPart}`
    : formattedWholePart;
  return formattedNumber;
}

function ProductCard(props: Props) {
  const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
  const { productId } = useParams();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const formattedPrice = formatNumberToThousands(props.product.price);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()


  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpen = () => {

  // };
  const handleAddToCart = async (productId: number) => {
     if(!userData.id){
       navigate("/login")  
        return;
     }
    setIsAddingToCart(true);
    setOpen(true);
    const response = await updateShoppingCart({
      productId: productId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    console.log(response);
    setIsAddingToCart(false);
  };

  return (
    <Box component="main">
      <Toolbar />
      <Card>
        <CardHeader
          avatar={
            <IconButton aria-label="add to favorites" sx={{ color: "#FAA205" }}>
              <FavoriteIcon />
            </IconButton>
          }
          action={
            <IconButton
              aria-label="settings"
              sx={{
                background: "#E7F5FF",
                color: "red",
              }}
              onClick={() => handleAddToCart(props.product.id)}
            >
              <GiShoppingCart />
            </IconButton>
          }
        />
        {isAddingToCart ? (
          <div
            style={{
              position: "absolute",
              left: "15px",
              top: "15px",
            }}
          >
            <MiniLoader />
          </div>
        ) : (
          <Link to={`/productDetails/${props.product.id}`}>
            <CardMedia
              component="img"
              height="289"
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Apply a scale effect on hover
                },
              }}
              src={props.product.image}
            />
          </Link>
        )}

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link
              to={`/productDetails/${props.product.id}`}
              style={{ color: "#000", textDecoration: "none" }}
            >
              {props.product.description.slice(0, 50)}...
            </Link>
          </Typography>

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", m: 1 }}
          >
            <span>&#8358;</span>
            {formattedPrice}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductCard;
