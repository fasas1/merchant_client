import { useState, useEffect } from "react";
// Material UI
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
import CircularProgress from "@mui/material/CircularProgress";
// Components
import { AddIcon } from "../../../../Icon";
import AddProductModal from "./Components/Modal";
import ProductResult from "./Components/ProductResult";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../../../../Apis/productApi";
import { setProduct } from "../../../../Storage/Redux/productSlice";
import { RootState } from "../../../../Storage/Redux/store";
// Toastify
import { toast } from "react-toastify";
// Interface
import { apiResponse, productModel } from "../../../../Interfaces";
import categories from "./productCategory";

const Product = () => {
  const { data, error, isLoading } = useGetProductsQuery(null);
  const { product } = useSelector((state: RootState) => state.productReducer);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [productForm, setProductForm] = useState<productModel>({
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    // Remove placeholder image
    image:
      "https://res.cloudinary.com/dgsjzsrw4/image/upload/v1691699385/watch-prod-3_mvvw3x.webp",
  });

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
    setProductForm({ ...productForm, category: e.target.value });
  };

  const handleEditProduct = () => {
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!id) {
      toast.error("Please provide a valid Product id");
      return;
    }
    if (window.confirm("Are you sure you want to delete this product?")) {
      const response: apiResponse = await deleteProduct(id);
      if (response.data && response.data.isSuccess) {
        toast.info("Product has been deleted");
      } else if (response.error) {
        toast.error(
          response.error.data?.errorMessages[0] || "Something went wrong"
        );
      }
    }
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { id, name, price, category, image } = productForm;
    e.preventDefault();
    if (!name || !category) {
      toast.error("Please provide a product name and category");
      return;
    }
    let response: apiResponse;

    if (isEditing) {
      if (!id) {
        toast.error("Please provide a valid Product id");
        return;
      }
      response = await editProduct({
        id,
        name,
        price,
        category,
        image,
      });
    } else {
      response = await addProduct({
        name,
        price,
        category,
        image,
      });
    }

    if (response.data && response.data.isSuccess) {
      toast.success(
        isEditing ? "Product has been ediited" : "Added new product"
      );
    } else if (response.error) {
      toast.error("Something went wrong");
    }

    setIsEditing(false);
    setOpenModal(false);
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
    return (
      <Typography variant='h5' align='center' component='p' sx={{ m: "4rem" }}>
        There was an error, please refresh page
      </Typography>
    );
  }

  return (
    <section>
      <Typography variant='h4' component='h2' sx={{ my: "2rem" }}>
        Product List
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
              defaultValue={productSearch}
              labelId='search-products'
              id='search-products'
              value={productSearch}
              label='search-product'
              onChange={(e: SelectChangeEvent) =>
                setProductSearch(e.target.value)
              }
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (!selected) {
                  return <em>Search Products by Category</em>;
                }

                return selected;
              }}
              fullWidth
            >
              {productSearch && (
                <MenuItem value=''>
                  <em style={{ color: "red" }}>Clear Search</em>
                </MenuItem>
              )}
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
        productSearch={productSearch}
      />
    </section>
  );
};

export default Product;
