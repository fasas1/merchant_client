import { Stack, Button, Grid } from "@mui/material";
import Box from "@mui/system/Box";
import styled from "@mui/system/styled";
import { EditIcon, DeleteIcon } from "../../../../../Icon";

type Prop = {
  handleEditProduct: () => void;
  handleDeleteProduct: () => void;
};
function ProductResult({ handleEditProduct, handleDeleteProduct }: Prop) {
  return (
    <div>
      <header style={{ margin: "2rem", width: "100%" }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
          useFlexGap
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          <span style={{ marginLeft: "-2rem" }}>Name</span>
          <span>Price</span>
          <span>Category</span>
          <span style={{ flexBasis: "38%" }}>Date</span>
          <span style={{ textAlign: "center", flexBasis: "10%" }}>Action</span>
        </Stack>
      </header>

      <main>
        {Array.from(Array(6)).map((product, index) => {
          return (
            <ProductItem
              handleEditProduct={handleEditProduct}
              handleDeleteProduct={handleDeleteProduct}
              key={index}
              index={index}
            />
          );
        })}
      </main>
    </div>
  );
}
export default ProductResult;

type ProductItemProp = {
  index: number;
  handleEditProduct: () => void;
  handleDeleteProduct: () => void;
};

const ProductItem = ({
  index,
  handleEditProduct,
  handleDeleteProduct,
}: ProductItemProp) => {
  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
    padding: theme.spacing(1),
    borderRadius: "4px",
    textAlign: "center",
  }));
  return (
    <div>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={1}
        useFlexGap
        sx={{
          display: {
            xs: "none",
            sm: "flex",
            textAlign: "center",
            borderBottom: "1px solid #112121",
            margin: "1rem 0",
            padding: ".5rem 0",
          },
        }}
      >
        <span>Product {index}</span>
        <span>Price {index}</span>
        <span>Category {index}</span>
        <span style={{ flexBasis: "40%", textAlign: "left" }}>
          Date {index}
        </span>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <Button onClick={handleEditProduct}>
            <EditIcon />
          </Button>
          <Button onClick={handleDeleteProduct}>
            <DeleteIcon />
          </Button>
        </Box>
      </Stack>
      {/* Mobile Screen */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", sm: "none" },
          margin: "2rem 0",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Item>Product {index}</Item>
          </Grid>
          <Grid xs={4}>
            <Item>Price {index}</Item>
          </Grid>
          <Grid xs={6}>
            <Item>Category {index}</Item>
          </Grid>
          <Grid xs={6}>
            <Item>Date {index}</Item>
          </Grid>

          <Grid xs={12}>
            <Item
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <Button variant='contained' onClick={handleEditProduct}>
                Edit
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleDeleteProduct}
              >
                Delete
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
