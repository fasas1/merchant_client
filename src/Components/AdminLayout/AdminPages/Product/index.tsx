import { useState } from "react";
import {
  Stack,
  Select,
  FormControl,
  MenuItem,
  Button,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AddIcon } from "../../../../Icon";
import AddProductModal from "./Components/Modal";
import ProductResult from "./Components/ProductResult";

const Product = () => {
  const [product, setProduct] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => {
    setIsEditing(false);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);
  const handleChange = (e: SelectChangeEvent) => {
    setProduct(e.target.value);
  };

  const handleEditProduct = () => {
    setIsEditing(true);
    // TODO
    // Create useState for Product modal
    // Propagate current product object to the modal
    setOpenModal(true);
  };

  const handleDeleteProduct = () => {
    // ToDO: Make a Delete Request
  };

  const handleProductSubmit = () => {
    // TODO: Make post request to add product,
    // or Edit depending on isEditing

    setIsEditing(false);
  };
  return (
    <section>
      <Typography variant='h4' component='h2' sx={{ my: "2rem" }}>
        Product
      </Typography>
      <AddProductModal
        handleChange={handleChange}
        handleClose={handleClose}
        openModal={openModal}
        product={product}
        isEditing={isEditing}
        handleProductSubmit={handleProductSubmit}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        alignItems='start'
        justifyContent='space-between'
        useFlexGap
      >
        <div style={{ flexBasis: "50%", width: "100%" }}>
          <FormControl fullWidth>
            <Select
              defaultValue={product}
              labelId='search-products'
              id='search-products'
              value={product}
              label='Age'
              onChange={handleChange}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (!selected) {
                  return <em>Search Products</em>;
                }

                return selected;
              }}
              fullWidth
            >
              <MenuItem disabled value=''>
                <em>Search Products</em>
              </MenuItem>
              <MenuItem value={"Product 1"}>Product 1</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant='contained' size='large' onClick={handleOpen}>
          <Stack
            direction='row'
            justifyContent='space-evenly'
            alignItems='center'
            spacing={1}
            useFlexGap
          >
            <span>ADD</span>
            <span
              style={{
                display: "flex",
                justifySelf: "center",
                alignSelf: "center",
              }}
            >
              <AddIcon />
            </span>
          </Stack>
        </Button>
      </Stack>
      <ProductResult
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
      />
    </section>
  );
};

export default Product;
