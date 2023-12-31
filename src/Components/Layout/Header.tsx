import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Routes, Route, NavLink, Link, useNavigate} from "react-router-dom";
import { Badge, Container, Switch } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { GiShoppingCart } from "react-icons/gi";
import { cartItemModel, userModel } from "../../Interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { emptyUserState, setLoggedInUser } from "../../Storage/Redux/userAuthSlice";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const drawerWidth = 240;

function DrawerAppBar({ darkMode, handleThemeChange }: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );


  const userData : userModel = useSelector((state: RootState) => state.userAuthStore);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Added for authentication status
  // const [showRegister, setShowRegister] = useState(false); // Added for registration screen

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Function to handle user logout
  const handleLogout = () => {
      localStorage.removeItem("token")
      dispatch(setLoggedInUser({...emptyUserState}))
      navigate("/")
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar component="nav">
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Merchant Gadgets
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange} />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <List sx={{ display: "flex", justifyContent:"center", alignItems:"center" }}>
             
                 {userData.id && (
                  <>
                <ListItem component={NavLink} to="" sx={{ color: "inherit" }}>
              <Typography variant='body1'>Welcome,{typeof userData.fullName === 'string' ? userData.fullName.split(' ')[0] : ''}</Typography>
                </ListItem>
                  <React.Fragment>      
                  <ListItem
                    component={NavLink}
                    to="/"
                    sx={{ color: "inherit" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </ListItem>
                </React.Fragment>
                </>
                 )}
                  {!userData.id && (
                  <React.Fragment>
                    <ListItem
                      component={NavLink}
                      to="/register"
                      sx={{ color: "inherit" }}
                    >
                      Register
                    </ListItem>
                    <ListItem
                      component={NavLink}
                      to="/login"
                      sx={{ color: "inherit" }}
                    >
                      Login
                    </ListItem>
                  </React.Fragment>
                )}
                <IconButton>
                  <Link
                    to="/shoppingCart"
                    color="secondary"
                  >
                    <GiShoppingCart style={{ color: "secondary" }} />
                    {userData.id && `(${shoppingCartFromStore.length})`}
                   
                  </Link>
                </IconButton>
              </List>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <List
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
    
              <React.Fragment>
                <ListItem
                  component={NavLink}
                  to="/logout"
                  sx={{ color: "#8C8C8C" }}
                >
                  Logout
                </ListItem>
              </React.Fragment>

              <React.Fragment>
                <ListItem
                  component={NavLink}
                  to="/register"
                  sx={{ color: "#8C8C8C" }}
                >
                  Register
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/login"
                  sx={{ color: "#8C8C8C" }}
                >
                  Login
                </ListItem>
              </React.Fragment>
      
            <IconButton>
              <Badge badgeContent={5}>
                <MailIcon />
              </Badge>
            </IconButton>
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;