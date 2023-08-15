import React from 'react'
import Box from '@mui/material/Box';
import { Grid, Toolbar, Typography } from '@mui/material';
import bannerImage from "../Assets/gadget-guy.png";
import Button from '@mui/material/Button'

function Banner() {
  return (
    <Box component="main" sx={{ p: 4 }}>
      <Toolbar/> 
      <Grid container>
         <Grid item xs={12} md={6} style={{ paddingTop: 80 }}>
           <Typography variant='h4'>Get the</Typography>
           <Typography variant='h2' color='secondary' style={{ fontWeight: 'bold' }}>Best Deal on your Gadget purchase</Typography>
           <Typography variant='body1' style={{ marginTop: 10}}>Merchant Gadgets: your number one store for quality Gadgets.</Typography>

           <Button
                  variant="contained"
                  sx={{ backgroundColor: '#000', color: 'white', marginTop:2}}
                 
                >
                 Shop Now
                </Button>
         </Grid>
         <Grid item xs={12} md={6} >
         <img src={bannerImage} style={{ width: '100%' }} />
        </Grid>
      </Grid>
         
    </Box>
  )
}

export default Banner