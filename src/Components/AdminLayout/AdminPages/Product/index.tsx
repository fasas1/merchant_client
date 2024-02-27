import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../../../Apis/productApi";
import { setProduct } from "../../../../Storage/Redux/productSlice";
import { RootState } from "../../../../Storage/Redux/store";
import CircularProgress from "@mui/material/CircularProgress";

const Product = () => {
  const { data, error, isLoading } = useGetProductsQuery(null);
  const { product } = useSelector((state: RootState) => state.productReducer);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  // const [productSearch, setProductSearch] = useState("");
  const [productForm, setProductForm] = useState<{
    id: number;
    name: string;
    price: number;
    category: string[];
  }>({ id: 0, name: "", price: 0, category: [] });

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setProduct(data.result));
    }
  }, [isLoading, data, dispatch]);

  const handleOpen = () => {
    setIsEditing(false);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setIsEditing(false);
  };
  const handleChange = (e: SelectChangeEvent) => {
    setProductCategory(e.target.value);
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

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Make post request to add product,
    // or Edit depending on isEditing

    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Stack
        sx={{ color: "grey.500", height: "100dvh", width: "100%" }}
        spacing={2}
        justifyContent='center'
        alignItems='center'
        direction='row'
      >
        <CircularProgress size='10%' color='secondary' />
      </Stack>
    );
  }

  if (error) {
    return <h2>There was an error, please refresh page</h2>;
  }

  return (
    <section>
      <Typography variant='h4' component='h2' sx={{ my: "2rem" }}>
        Product
      </Typography>
      <AddProductModal
        productForm={productForm}
        setProductForm={setProductForm}
        handleChange={handleChange}
        handleClose={handleClose}
        openModal={openModal}
        productCategory={productCategory}
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
        productForm={productForm}
        setProductForm={setProductForm}
      />
    </section>
  );
};

export default Product;
