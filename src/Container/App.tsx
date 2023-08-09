import {useState} from "react";
import { Header } from "../Components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";










function App() {
  const [darkMode, setDarkMode] = useState(false);
const  paletteType = darkMode ? 'dark' : 'light'
  
const theme = createTheme({
  palette: {
     mode: paletteType,
  
   
  },
});

function handleThemeChange(){
  setDarkMode(!darkMode)
}


  return (
    <div>
         <ThemeProvider  theme={theme}>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        Main componenet
        </ThemeProvider>
    </div>
  );
}

export default App;
