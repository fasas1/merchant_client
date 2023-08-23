import {useEffect,useState} from "react";
import { Header } from "../Components/Layout";
import { ThemeProvider, createTheme} from "@mui/material/styles";
import { orange} from "@mui/material/colors";
import { Home, NotFound,ProductDetails, ShoppingCart } from "../Pages";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice ";




function App() {
    const dispatch = useDispatch()
    const {data, isLoading} = useGetShoppingCartQuery("d2e467d9-51d3-4298-8246-c5d048e5f0c2")

  const [darkMode, setDarkMode] = useState(false);
 // const  paletteType = darkMode ? 'dark' : 'light'

useEffect(() => {
     if(!isLoading){
        dispatch(setShoppingCart(data.result?.cartItems))
     }
},[data])


const theme = createTheme({
  palette: {
    // mode: paletteType,
    mode: darkMode ? 'dark' : 'light',
    background: {
      default: darkMode ? '#1c1c1c' : '#f0f0f0', // Dark and Light mode backgrounds
      paper: darkMode ? '#333' : '#fff',       // Dark and Light mode paper colors
    },
     primary:{
       main: '#fefefe'
     },
     secondary: orange
  },
});

function handleThemeChange(){
  setDarkMode(!darkMode)
}


  return (
    <div>
  
         <ThemeProvider  theme={theme}>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
       <Container>
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/productDetails/:productId" element={<ProductDetails/>}/> 
          <Route path="/shoppingCart" element={<ShoppingCart/>}/> 
          <Route path="*" element={<NotFound/>}/> 
        </Routes>
    
       
         </Container>
         
        </ThemeProvider>
    
    </div>
  );
}

export default App;
