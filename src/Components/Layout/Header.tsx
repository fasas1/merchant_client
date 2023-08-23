import * as React from "react";
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
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { Badge, Container, Switch } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import {GiShoppingCart} from "react-icons/gi"
import { cartItemModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";


interface Props {
    darkMode:boolean,
    handleThemeChange: () => void;
}

const drawerWidth = 240;
//const navItems = ['Home', 'About', 'Contact'];

const rightLinks = [
  { title: "Product", path: "/" },
  { title: "Service", path: "/Service" },
];

function DrawerAppBar({darkMode, handleThemeChange}: Props) {
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

 
  const [mobileOpen, setMobileOpen] = React.useState(false);



  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
   
      <Divider />
    </Box>
  );

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
            <List sx={{display:'flex'}}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  key={path}
                  to={path}
                  sx={{ color: 'inherit' }}
        >
                 {title.toUpperCase()}
                </ListItem>
              ))}
               <IconButton>
             
                <Link to="/shoppingCart"
                          color="secondary">
                  <GiShoppingCart  style={{ color: 'secondary' }}/>
                   {shoppingCartFromStore?.length? `(${shoppingCartFromStore.length})` : " "}
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
                 <List  sx={{
            display: { xs: "block", sm: "none" },  "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            }}}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  key={path}
                  to={path}
                  sx={{ color: '#8C8C8C' }}
              
                >
                 {title.toUpperCase()}
                </ListItem>
              ))}
               <IconButton>
               <Badge badgeContent={5} >
                  <MailIcon/>
               </Badge>
            </IconButton>
            </List>
         
        </Drawer>
      </Box>
   
    </Box>
  );
}

export default DrawerAppBar;
