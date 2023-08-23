import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'


// interface Props {
//    message?: string;
// }
function MiniLoader() {
  return (
    <div style={{scale: '100%'}}>
      <Backdrop open={true} invisible={true}>
      <Box display='flex' justifyContent='center'>
        <CircularProgress color='secondary'/>
        {/* <Typography variant='h6'></Typography> */}
      </Box>
        
     </Backdrop> 
     
    </div>
  )
}

export default MiniLoader