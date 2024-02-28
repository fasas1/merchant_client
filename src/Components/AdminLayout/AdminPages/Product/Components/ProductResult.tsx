import {
  Stack,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/system/Box";
import styled from "@mui/system/styled";
import { EditIcon, DeleteIcon } from "../../../../../Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../Storage/Redux/store";
import { productModel } from "../../../../../Interfaces";

type productForm = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};
type Prop = {
  handleEditProduct: () => void;
  handleDeleteProduct: (id: number) => void;
  productForm: productForm;
  setProductForm: React.Dispatch<React.SetStateAction<productForm>>;
};
function ProductResult({
  handleEditProduct,
  handleDeleteProduct,
  productForm,
  setProductForm,
}: Prop) {
  const { product } = useSelector((state: RootState) => state.productReducer);
  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  if (product.length === 0) {
    return (
      <Typography
        variant='h4'
        align='center'
        component='h2'
        sx={{ margin: "2rem 0" }}
      >
        No products available, Add a product
      </Typography>
    );
  }
  return (
    <div>
      <header style={{ margin: "2rem", width: "100%" }}>
        <Grid container sx={{ display: { xs: "none", sm: "flex" } }}>
          <Grid item sm={2}>
            <Item>
              <Typography overflow='hidden' align='left'>
                Name
              </Typography>
            </Item>
          </Grid>
          <Grid item sm={2}>
            <Item>
              <Typography overflow='hidden' align='left'>
                Price
              </Typography>
            </Item>
          </Grid>
          <Grid item sm={2}>
            <Item>
              <Typography overflow='hidden' align='left'>
                Category
              </Typography>
            </Item>
          </Grid>
          <Grid item sm={3}>
            <Item>
              <Typography overflow='hidden' align='left'>
                Date
              </Typography>
            </Item>
          </Grid>
          <Grid item sm={3}>
            <Item>
              <Typography overflow='hidden'>Action</Typography>
            </Item>
          </Grid>
        </Grid>
      </header>

      <main>
        {product.map((product) => {
          return (
            <ProductItem
              product={product}
              handleEditProduct={handleEditProduct}
              handleDeleteProduct={handleDeleteProduct}
              key={product.id}
              productForm={productForm}
              setProductForm={setProductForm}
            />
          );
        })}
      </main>
    </div>
  );
}
export default ProductResult;

type ProductItemProp = {
  product: productModel;
  handleEditProduct: () => void;
  handleDeleteProduct: (id: number) => void;
  productForm: productForm;
  setProductForm: React.Dispatch<React.SetStateAction<productForm>>;
};

const ProductItem = ({
  product,
  handleEditProduct,
  handleDeleteProduct,
  productForm,
  setProductForm,
}: ProductItemProp) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
    border: isMatch ? "1px solid" : "0px solid",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
    padding: theme.spacing(1),
    borderRadius: isMatch ? "4px" : "0px",
    textAlign: "center",
  }));
  const { id, name, price, category } = product;
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          margin: "2rem 0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8} sm={2}>
            <Item>
              <Stack
                direction='column'
                alignItems='center'
                justifyContent='space-between'
                spacing={1}
                useFlexGap
              >
                <Typography sx={{ display: { xs: "flex", sm: "none" } }}>
                  Name:
                </Typography>
                <Typography overflow='clip'>{name}</Typography>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Item>
              <Stack
                direction='column'
                alignItems='center'
                justifyContent='space-between'
                spacing={1}
                useFlexGap
              >
                <Typography sx={{ display: { xs: "flex", sm: "none" } }}>
                  Price:
                </Typography>
                <Typography overflow='clip'>&#8358;{price}</Typography>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Item>
              <Stack
                direction='column'
                alignItems='center'
                justifyContent='space-between'
                spacing={1}
                useFlexGap
              >
                <Typography sx={{ display: { xs: "flex", sm: "none" } }}>
                  Category:
                </Typography>
                <Typography overflow='clip'>{category}</Typography>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Item>
              <Stack
                direction='column'
                alignItems='center'
                justifyContent='space-between'
                spacing={1}
                useFlexGap
              >
                <Typography sx={{ display: { xs: "flex", sm: "none" } }}>
                  Date:
                </Typography>
                <Typography overflow='clip'>TBD</Typography>
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Item>
              <Box
                sx={{
                  display: { xs: "flex" },
                  justifyContent: "end",
                  gap: isMatch ? "1rem" : "0",
                }}
              >
                <Button
                  variant={isMatch ? "contained" : "text"}
                  onClick={() => {
                    setProductForm({
                      ...productForm,
                      id,
                      name,
                      price,
                      category: "test",
                    });
                    handleEditProduct();
                  }}
                >
                  {isMatch ? <Typography>Edit</Typography> : <EditIcon />}
                </Button>
                <Button
                  variant={isMatch ? "contained" : "text"}
                  color={isMatch ? "error" : "inherit"}
                  onClick={() => {
                    handleDeleteProduct(id);
                  }}
                >
                  {isMatch ? <Typography>Delete</Typography> : <DeleteIcon />}
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
