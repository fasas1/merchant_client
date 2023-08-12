import {
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../Apis/productApi'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


function ProductDetails() {
  const { productId } = useParams()
  const { data, isLoading } = useGetProductByIdQuery(productId)
  console.log(data)

  return (
    <Box sx={{ p: 4 }}>
      <Toolbar />
      <Grid container>
        {!isLoading ? (
          <>
            <Grid item xs={6}>
              <img src={data.result.image} style={{ width: '80%' }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">{data.result.name}</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{data.result.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>{data.result.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>{data.result.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell><span>&#8358;</span>
                       {data.result.price}    
                    </TableCell>
                    <TableCell sx={{display:'flex'}}>
                    <IconButton><AddIcon/></IconButton>
                    <span style={{margin:'10px 10px 0 10px'}}>XX</span>
                    <IconButton><RemoveIcon/></IconButton>
                    </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Toolbar
                variant="dense"
                disableGutters
                sx={{ minHeight: 20, height: 20 }}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ color: 'white' }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#000', color: 'white' }}
                >
                  Back to Home
                </Button>
              </Stack>
            </Grid>
          </>
        ) : (
          <>
            <div>Loading....</div>
          </>
        )}
      </Grid>
    </Box>
  )
}

export default ProductDetails
