import { useState} from "react";
import { Header } from "../Components/Layout";
import { ThemeProvider, createTheme} from "@mui/material/styles";
import { orange} from "@mui/material/colors";
import { Home, NotFound,ProductDetails } from "../Pages";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";


//import Banner from "../Pages/Banner";




function App() {

  const [darkMode, setDarkMode] = useState(false);
 // const  paletteType = darkMode ? 'dark' : 'light'


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
        {/* <Banner/> */}    <Container>
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/productDetails/:productId" element={<ProductDetails/>}/> 
          <Route path="*" element={<NotFound/>}/> 
        </Routes>
    
       
         </Container>
        </ThemeProvider>
    
    </div>
  );
}

export default App;
