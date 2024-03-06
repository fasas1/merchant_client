import React from "react";
// Material UI
import {
  Select,
  MenuItem,
  Button,
  Grid,
  Modal,
  Typography,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/system/Box";
import styled from "@mui/system/styled";
// Interface
import { productModel } from "../../../../../Interfaces";
import categories from "../productCategory";
import { CancelIcon } from "../../../../../Icon";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  zIndex: 20,
};

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
}));

type Prop = {
  productCategory: string;
  openModal: boolean;
  handleClose: () => void;
  isEditing: boolean;
  handleChange: (e: SelectChangeEvent) => void;
  handleProductSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  productForm: productModel;
  setProductForm: React.Dispatch<React.SetStateAction<productModel>>;
};

const AddProductModal = ({
  productCategory,
  openModal,
  handleClose,
  handleChange,
  isEditing,
  handleProductSubmit,
  productForm,
  setProductForm,
}: Prop) => {
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box
        sx={{ ...style, width: { xs: "100%", sm: "80%" }, p: { xs: 1, sm: 4 } }}
      >
        <Box component='div' sx={{ display: "flex", justifyContent: "end" }}>
          <Button type='button' color='error' onClick={handleClose}>
            <CancelIcon />
          </Button>
        </Box>
        <Typography variant='h4' component='h2' sx={{ textAlign: "center" }}>
          {isEditing ? "Edit Product" : "Add Product"}
        </Typography>

        <Box
          component='form'
          sx={{ mt: "2rem" }}
          noValidate
          autoComplete='off'
          onSubmit={handleProductSubmit}
        >
          <Grid container item={true}>
            <Grid item xs={12}>
              <Item>
                <TextField
                  id='Name'
                  label='Name'
                  variant='outlined'
                  value={productForm.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <TextField
                  id='Price'
                  label='Price(₦)'
                  value={productForm.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProductForm({
                      ...productForm,
                      price: Number(e.target.value),
                    })
                  }
                  inputProps={{ type: "number" }}
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Select
                  defaultValue={productCategory}
                  labelId='search-products'
                  id='search-products'
                  value={productCategory}
                  label='Age'
                  onChange={handleChange}
                  displayEmpty
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <>Category</>;
                    }

                    return selected;
                  }}
                  fullWidth
                >
                  <MenuItem disabled value=''>
                    <em>Categories</em>
                  </MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem
                      key={index}
                      value={category}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <TextField
                  id='Description'
                  label='Description'
                  multiline
                  rows={4}
                  value={productForm.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Button type='submit' variant='contained' size='large'>
                  SUBMIT
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
