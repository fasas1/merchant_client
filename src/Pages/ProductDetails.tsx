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
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../Apis/productApi'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useUpdateShoppingCartMutation } from '../Apis/shoppingCartApi'




function ProductDetails() {
  const { productId } = useParams()
  const { data, isLoading } = useGetProductByIdQuery(productId)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)
  const [updateShoppingCart] = useUpdateShoppingCartMutation()
  const navigate = useNavigate()


  const  handleQuantity = (counter:number) => {
      let newQuantity = quantity + counter;

      if(newQuantity == 0){
          newQuantity = 1
      } 
      setQuantity(newQuantity);
        return;
  }

  const handleAddToCart = async (productId:number) =>{
       setIsAddingToCart(true)
      
     const response =  await updateShoppingCart({
       productId:productId, 
       updateQuantityBy:quantity,
        userId:'d2e467d9-51d3-4298-8246-c5d048e5f0c2'
      })
       console.log(response)
       setIsAddingToCart(false)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Toolbar />
      <Grid container>
        {!isLoading ? (
          <>
            <Grid item xs={12} md={6}>
              <img src={data.result.image} alt='image-details' style={{ width: '80%' }} />
            </Grid>
            <Grid item xs={12}  md={6}>
              <Typography variant="h3">{data.result.name}</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{data.result.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Details</TableCell>
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
                    <IconButton
                     onClick={() =>{
                         handleQuantity(+1)
                     }}>
                      <AddIcon/>
                    </IconButton>
                    <span style={{margin:'10px 10px 0 10px'}}>{quantity}</span>
                    <IconButton
                      onClick={() =>{
                        handleQuantity(-1)
                    }}
                    ><RemoveIcon/>
                    </IconButton>
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
                <Link to="/shoppingCart">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ color: 'white' }}
                  onClick={()=> handleAddToCart(data.result.id)}
                >
                  Add to Cart
                </Button>
                </Link>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#000', color: 'white' }}
                  onClick={() => {
                     navigate(-1)
                  }}
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
