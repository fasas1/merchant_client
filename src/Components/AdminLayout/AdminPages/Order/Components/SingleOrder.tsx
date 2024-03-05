import { useParams } from "react-router-dom";
// Material UI
import { Stack, CircularProgress, Typography } from "@mui/material";
// Redux
import { useGetOrderByIdQuery } from "../../../../../Apis/orderApi";

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

  console.log(data);

  return <div>SingleOrder</div>;
};
export default SingleOrder;
