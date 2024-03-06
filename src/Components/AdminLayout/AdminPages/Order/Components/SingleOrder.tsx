import { Link, useParams } from "react-router-dom";
// Material UI
import { Stack, CircularProgress, Typography, Box } from "@mui/material";
// Redux
import { useGetOrderByIdQuery } from "../../../../../Apis/orderApi";
// Icon
import { BackIcon } from "../../../../../Icon";
// Interfaces
import OrderHeader from "../../../../../Interfaces/orderHeaderModel";
import OrderDetail from "../../../../../Interfaces/orderDetailsModel";

const SingleOrder = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOrderByIdQuery(id);

  if (isLoading) {
    return (
      <Stack
        sx={{ color: "grey.500", height: "100dvh", width: "100%" }}
        spacing={2}
        justifyContent='center'
        alignItems='center'
        direction='row'
      >
        <CircularProgress size='10%' color='secondary' />
      </Stack>
    );
  }

  if (error) {
    return (
      <Typography variant='h5' align='center' component='p' sx={{ m: "4rem" }}>
        There was an error, please refresh page
      </Typography>
    );
  }

  if (data && data.result.length === 0) {
    return (
      <Typography
        variant='h4'
        align='center'
        component='h2'
        sx={{ margin: "2rem 0" }}
      >
        Order not found
      </Typography>
    );
  }

  const order: OrderHeader = data.result[0];

  const {
    orderHeaderId,
    status,
    orderDate,
    orderDetails,
    pickUpName,
    pickUpEmail,
    pickUpPhoneNumber,
  } = order;

  let totalAmount = 0;
  if (orderDetails.length > 0) {
    orderDetails.forEach((detail) => {
      totalAmount += detail.price * detail.quantity;
    });
  }
  return (
    <Box component='section'>
      <Box component='header'>
        <Link
          to='/admin/order'
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Stack
            spacing={2}
            justifyContent='start'
            alignItems='center'
            direction='row'
          >
            <BackIcon h={30} w={30} />
            <Typography fontWeight='bold' variant='h5'>
              Orders
            </Typography>
          </Stack>
        </Link>

        <Typography
          variant='h3'
          fontWeight='500'
          sx={{
            my: "2rem",
            display: "flex",
            justifyItems: "start",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Box component='span'>Order ID: {orderHeaderId}</Box>
          <Typography
            component='span'
            overflow='hidden'
            align='left'
            textTransform='capitalize'
            sx={{
              backgroundColor: status === "pending" ? "red" : "green",
              color: "white",
              padding: ".3rem",
            }}
          >
            {status}
          </Typography>
        </Typography>

        <Typography color='darkgray' component='p'>
          Order Date: {new Date(orderDate).toDateString()}
        </Typography>
      </Box>

      <Box component='main' margin='2rem 0'>
        <Typography
          fontWeight='bold'
          variant='h6'
          borderBottom='1px solid black'
        >
          Order Details
        </Typography>

        <Box component='div' margin='1rem'>
          {orderDetails.length === 0 ? (
            <Typography align='center' m='2rem 0' variant='h6'>
              No products for this order
            </Typography>
          ) : (
            <Box>
              {orderDetails.map((detail) => (
                <ProductItem key={detail.orderDetailsId} product={detail} />
              ))}
            </Box>
          )}
        </Box>

        <Box component='div' my='1rem'>
          <Stack
            spacing={2}
            justifyContent='space-between'
            alignItems='center'
            direction='row'
          >
            <Typography variant='h5'>Total:</Typography>
            <Typography variant='h5' fontWeight='500'>
              ₦ {totalAmount}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box component='div' my='1rem'>
        <Typography
          variant='h5'
          fontSize='500'
          sx={{ textDecoration: "underline", textUnderlineOffset: ".4rem" }}
        >
          Customer Information
        </Typography>
        <Typography variant='h6' my='1rem'>
          Customer Name - {pickUpName}
        </Typography>
        <Typography variant='h6' my='1rem'>
          Customer Email - {pickUpEmail}
        </Typography>
        <Typography variant='h6' my='1rem'>
          Customer Phone Number -
          <a href={"tel:" + pickUpPhoneNumber}> {pickUpPhoneNumber}</a>
        </Typography>
      </Box>
    </Box>
  );
};

type ProductItemProp = {
  product: OrderDetail;
};
const ProductItem = ({ product }: ProductItemProp) => {
  const { itemName, price, quantity } = product;
  return (
    <Stack
      spacing={2}
      justifyContent='space-between'
      alignItems='center'
      direction='row'
      pb='.5rem'
      mb='1rem'
      borderBottom='1px solid darkgray'
    >
      <Stack
        spacing={2}
        justifyContent='start'
        alignItems='center'
        direction='row'
      >
        <img
          src={product.product.image}
          height={80}
          width={80}
          style={{ border: "1px solid darkgray", borderRadius: "4px" }}
        />
        <Box>
          <Typography variant='h6' mb='.5rem' textTransform='capitalize'>
            {itemName}
          </Typography>
          <Typography color='blue'>{product.product.category}</Typography>
        </Box>
      </Stack>

      <Stack
        spacing={2}
        justifyContent='start'
        alignItems='center'
        direction='column'
      >
        <Typography variant='h6'>₦{price}</Typography>
        <Typography color='blue'>Qty: {quantity}</Typography>
      </Stack>
    </Stack>
  );
};
export default SingleOrder;
