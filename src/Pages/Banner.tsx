import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Banner() {
  return (
    <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
    <h5>The contrastText token is calculated using the contrastThreshold value, to maximize the contrast between the background and the text.

A higher contrast threshold value increases the point at which a background color is considered light, and thus given a dark contrastText. Note that the contrast threshold follows a non-linear curve, and defaults to a value of 3 which indicates a minimum contrast ratio of 3:1.</h5>
   </Box>
  )
}

export default Banner