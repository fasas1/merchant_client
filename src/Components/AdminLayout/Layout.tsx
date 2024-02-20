import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Home } from "@mui/icons-material";

// import Product from "../Pages/Product";
// import SalesReport from "../Pages/SalesReport";
// import Customer from "../Pages/Customer";
//seline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Order, Product,Dashboard  } from "./AdminPages";


const drawerWidth = 240;
const theme = createTheme({
  palette: {
    background: {
      default: "#F3F3F3",
    },
  },
});

interface ResponsiveDrawerProps {
    window?: () => Window;
  }
const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
  
    

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/layout/dashboard")}>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/layout/product")}>
          <ListItemButton>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText>Product</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/layout/sales-report")}>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>Sales Report</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/layout/order")}>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText>Order</ListItemText>
          </ListItemButton>
        </ListItem>
       
      </List>
      <Divider />
    
    </div>
  );


  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
     
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "#fff",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color:'#000', display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={2} color="error">
                  <MailIcon
                    sx={{
                      color: "#000",
                       display: { sm: "none" }
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={6} color="error">
                  <NotificationsIcon
                    sx={{
                      color: "#000",
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton
         
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
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
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar/>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/order" element={<Order/>}></Route>
            <Route path="/product" element={<Product />}></Route>
           
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
