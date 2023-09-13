import { useEffect, useState } from "react";
import { Header } from "../Components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import {
  Home,
  NotFound,
  ProductDetails,
  ShoppingCart,
  Register,
  Login,
  AuthenticationTest,
  AuthenticationAdminTest,
  AccessDenied,
} from "../Pages";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice ";
import jwt_decode from "jwt-decode";
import userModel from "../Interfaces/userModel";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";


function App() {
  const dispatch = useDispatch();
  const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetShoppingCartQuery(
      userData.id
  );

  const [darkMode, setDarkMode] = useState(false);
  // const  paletteType = darkMode ? 'dark' : 'light'


  useEffect(() =>{
    const localToken = localStorage.getItem("token")
    if(localToken){
      const {fullName, id, email, role} :userModel = jwt_decode(localToken)
      dispatch(setLoggedInUser({fullName, id, email, role}))  
  }
},[])


  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  const theme = createTheme({
    palette: {
      // mode: paletteType,
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#1c1c1c" : "#f0f0f0", // Dark and Light mode backgrounds
        paper: darkMode ? "#333" : "#fff", // Dark and Light mode paper colors
      },
      primary: {
        main: "#fefefe",
      },
      secondary: orange,
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/productDetails/:productId"
              element={<ProductDetails />}
            />
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authorization"  element={<AuthenticationAdminTest/>}/>
            <Route path="/authentication"   element={<AuthenticationTest/>} />
            <Route path="/accessDenied" element={<AccessDenied/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
