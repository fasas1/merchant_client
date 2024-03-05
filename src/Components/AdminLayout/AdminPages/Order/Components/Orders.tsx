import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Material UI
import {
  Box,
  Grid,
  Stack,
  Typography,
  styled,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
// Redux
import { useGetOrdersQuery } from "../../../../../Apis/orderApi";
// Interface
import OrderHeader from "../../../../../Interfaces/orderHeaderModel";

type Prop = {
  orderStatus: string;
  setOrderStatus: React.Dispatch<React.SetStateAction<string>>;
};
export default function Orders({ orderStatus, setOrderStatus }: Prop) {
  const { data, error, isLoading } = useGetOrdersQuery(null);
  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "lightblue",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
    padding: theme.spacing(1),
    textAlign: "center",
  }));

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
        No Orders has been made yet
      </Typography>
    );
  }

  let filteredOrders: OrderHeader[] = data.result.filter(
    (order: OrderHeader) => {
      if (!orderStatus) {
        return order;
      }

      return order.status.toLowerCase() === orderStatus.toLowerCase();
    }
  );

  return (
    <Box component='div'>
      <Box component='header' sx={{ margin: "2rem 0", width: "100%" }}>
        <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
          <Grid item md={2}>
            <Item>
              <Typography fontWeight='bold' overflow='hidden' align='left'>
                Order ID
              </Typography>
            </Item>
          </Grid>
          <Grid item md={2}>
            <Item>
              <Typography fontWeight='bold' overflow='hidden' align='left'>
                Customer
              </Typography>
            </Item>
          </Grid>
          <Grid item md={2}>
            <Item>
              <Typography fontWeight='bold' overflow='hidden' align='left'>
                Items
              </Typography>
            </Item>
          </Grid>
          <Grid item md={2}>
            <Item>
              <Typography fontWeight='bold' overflow='hidden' align='left'>
                Status
              </Typography>
            </Item>
          </Grid>
          <Grid item md={2}>
            <Item>
              <Typography fontWeight='bold' overflow='hidden' align='left'>
                Date
              </Typography>
            </Item>
          </Grid>
          <Grid item md={2}>
            <Item>
              <Typography fontWeight='bold' overflow='hidden'>
                Total (₦)
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Box component='main'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            return <OrderItem order={order} key={order.orderHeaderId} />;
          })
        ) : (
          <Stack
            spacing={3}
            justifyContent='center'
            alignItems='center'
            direction='column'
          >
            <Typography
              variant='h4'
              align='center'
              component='h2'
              sx={{ margin: "2rem 0" }}
            >
              No order matched your search : (
            </Typography>
            <Button
              variant='outlined'
              color='warning'
              onClick={() => setOrderStatus("")}
            >
              Clear Filters
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

type OrderItemProp = {
  order: OrderHeader;
};
function OrderItem({ order }: OrderItemProp) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  let totalAmount = 0;

  if (order.orderDetails.length > 0) {
    order.orderDetails.forEach((detail) => {
      totalAmount += detail.price;
    });
  }
  return (
    <Grid
      container
      sx={{
        backgroundColor: { xs: "#6a5acd", md: "transparent" },
        padding: { xs: "1rem .8rem" },
        color: { xs: "#fff", md: "black" },
        gap: { xs: "1rem", md: 0 },
        borderRadius: "1rem",
        marginBottom: { xs: "1rem", md: 0 },
      }}
    >
      <Grid item height='1rem' xs={12} md={2}>
        <Stack direction='row' spacing={1} useFlexGap>
          <Typography
            overflow='hidden'
            align='left'
            sx={{ display: { xs: "block", md: "none" } }}
          >
            OrderID:
          </Typography>
          <Link
            to={"/admin/order/" + order.orderHeaderId}
            style={{ textDecoration: isMatch ? "none" : "underline" }}
          >
            <Typography
              overflow='hidden'
              align='left'
              sx={{
                color: { xs: "#fff", md: "black" },
              }}
            >
              # {order.orderHeaderId}
            </Typography>
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12} md={2}>
        <Stack direction='row' spacing={1} useFlexGap>
          <Typography
            overflow='hidden'
            align='left'
            sx={{ display: { xs: "block", md: "none" } }}
          >
            Name:
          </Typography>
          <Typography
            fontWeight='bold'
            textTransform='capitalize'
            overflow='hidden'
            align='left'
          >
            {order.pickUpName}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={2}>
        <Stack direction='row' spacing={1} useFlexGap>
          <Typography
            overflow='hidden'
            align='left'
            sx={{ display: { xs: "block", md: "none" } }}
          >
            Number of Items:
          </Typography>
          <Typography fontWeight='bold' overflow='hidden' align='left'>
            {order.totalItems}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={2}>
        <Stack direction='row' alignItems='center' spacing={1} useFlexGap>
          <Typography
            overflow='hidden'
            align='left'
            sx={{ display: { xs: "block", md: "none" } }}
          >
            Order Status:
          </Typography>
          <Typography
            overflow='hidden'
            align='left'
            sx={{
              backgroundColor: order.status === "pending" ? "red" : "green",
              color: "white",
              padding: ".3rem",
            }}
          >
            {order.status}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={2}>
        <Stack direction='row' spacing={1} useFlexGap>
          <Typography
            overflow='hidden'
            align='left'
            sx={{ display: { xs: "block", md: "none" } }}
          >
            Order Date:
          </Typography>
          <Typography overflow='hidden' align='left'>
            {new Date(order.orderDate).toDateString()}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={2}>
        <Stack
          direction='row'
          justifyContent={isMatch ? "flex-start" : "flex-end"}
          spacing={1}
          useFlexGap
        >
          <Typography
            overflow='hidden'
            align='left'
            sx={{ display: { xs: "block", md: "none" } }}
          >
            Total Price (₦):
          </Typography>
          <Link
            to={"/admin/order/" + order.orderHeaderId}
            style={{ textDecoration: isMatch ? "none" : "underline" }}
          >
            <Typography
              fontWeight='bold'
              overflow='hidden'
              align='center'
              sx={{
                color: { xs: "#fff", md: "black" },
              }}
            >
              {totalAmount}
            </Typography>
          </Link>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        sx={{ display: { xs: "flex", md: "none" }, justifyContent: "end" }}
      >
        <Button
          variant='contained'
          type='button'
          color='success'
          onClick={() => navigate("/admin/order/" + order.orderHeaderId)}
        >
          View more
        </Button>
      </Grid>
    </Grid>
  );
}
