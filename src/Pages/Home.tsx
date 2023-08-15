import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ProductList } from '../Components/Page/Home';
import Banner from './Banner';


function Home(): JSX.Element {
  return (
    <>
    <Banner/>
     <ProductList/>
    </>
  )
}

export default Home;