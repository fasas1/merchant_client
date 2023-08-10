import {useEffect, useState} from "react";
import { Header } from "../Components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { productModel } from "../Interfaces";
//import Banner from "../Pages/Banner";




function App() {
  const [products, setProducts] = useState<productModel[]>([])
  const [darkMode, setDarkMode] = useState(false);
  const  paletteType = darkMode ? 'dark' : 'light'
  

 useEffect(() =>{
    fetch("https://localhost:7147/api/Product")
    .then((response) => response.json())
    .then((data) =>{
       console.log(data)
       setProducts(data.result)
    })
 }, [])

 
const theme = createTheme({
  palette: {
     mode: paletteType,
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
        {/* <Banner/> */}

        </ThemeProvider>
    </div>
  );
}

export default App;
