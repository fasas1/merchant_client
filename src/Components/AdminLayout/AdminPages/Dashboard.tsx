import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import MoneyIcon from "@mui/icons-material/Money";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FcMoneyTransfer } from "react-icons/fc";
import { BiSolidShoppingBags } from "react-icons/bi";
import { BsBasketFill } from "react-icons/bs";
//import {  userModel } from "../Interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { emptyUserState, setLoggedInUser } from "../../../Storage/Redux/userAuthSlice";

//import { makeStyles } from '@material-ui/core/styles';
 import BarChart from "../BarChart";
import PieChart from "../PieChart";
import { userModel } from "../../../Interfaces";
//import PieChart from "../../Components/AdminLayout/PieChart";

// const useStyles = makeStyles ({
//      icons:{
//       background: 'blue',
//       borderRadius: '50%',
//       width: '100px',
//       height: '100px'
//      }
// })

// function createData(
//   name,
//   calories,
//   fat,
//   carbs,
//   protein,
//   fatty,
//   lettuse,
//   shorty,
//   newsswd
// ) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     fatty,
//     lettuse,
//     shorty,
//     newsswd,
//   };
// }

// const rows = [
//   createData("Iphone 11 Pro", 66857, 345000, 5,  3405000),
//   createData("Macbook Air", 58857, 750000, 2, 1400000),
//   createData("Laptop", 33405, 125000, 6, 2100000),
// ];

const Dashboard = () => {
  // const classes = useStyles();
  const userData :userModel = useSelector((state: RootState) => state.userAuthStore);
  return (
    <div>
      <Box>
        {/* <Typography variant="h4">Dashboard</Typography> */}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Welcome back, {typeof userData.fullName === 'string' ? userData.fullName.split(' ')[0] : ''}
        </Typography>
        <Typography variant="body2" color= 'primary'>
              Here's what's happening with your store today.
        </Typography>
        <Toolbar
          variant="dense"
          disableGutters
          sx={{ minHeight: 20, height: 20 }}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <IconButton sx={{ background: "#E7F5FF" }}>
                    <FcMoneyTransfer />
                  </IconButton>
                </Avatar>
              }
              title="Total Sales"
              titleTypographyProps={{ variant: "h6" }}
              subheader="N787,000"
            />

            {/* <CardContent>
              <Typography variant="h6" color="text.secondary">
                N11000,000.00
              </Typography>
            </CardContent> */}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <IconButton sx={{ background: "#E7F5FF" }}>
                    <BiSolidShoppingBags />
                  </IconButton>
                </Avatar>
              }
              title="Total Products"
              titleTypographyProps={{ variant: "h6" }}
              subheader="78"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <IconButton sx={{ background: "#E7F5FF" }}>
                    <BsBasketFill />
                  </IconButton>
                </Avatar>
              }
              title="Total Orders"
              titleTypographyProps={{ variant: "h6" }}
              subheader="24"
            />
          </Card>
        </Grid>
      </Grid>
      <Toolbar
        variant="dense"
        disableGutters
        sx={{ minHeight: 20, height: 20 }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
          <BarChart/>
          </Card>
        
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
           <PieChart/>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{ minHeight: 20, height: 20 }}
          />
          {/* <Typography variant="h6" spacing={2}>
      Top Products
          </Typography> */}
          <Card>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product name</TableCell>
                    <TableCell align="right">Order id</TableCell>
                    <TableCell align="right">Price&nbsp;</TableCell>
                    <TableCell align="right">Sold&nbsp;</TableCell>
                    <TableCell align="right">Sales&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                      <TableCell align="right">{row.fatty}</TableCell>
       
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
