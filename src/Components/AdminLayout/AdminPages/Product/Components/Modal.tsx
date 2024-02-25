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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type Prop = {
  product: string;
  openModal: boolean;
  handleClose: () => void;
  isEditing: boolean;
  handleChange: (e: SelectChangeEvent) => void;
  handleProductSubmit: () => void;
};

const AddProductModal = ({
  product,
  openModal,
  handleClose,
  handleChange,
  isEditing,
  handleProductSubmit,
}: Prop) => {
  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h4' component='h2' sx={{ textAlign: "center" }}>
          {isEditing ? "Edit Product" : "Add Product"}
        </Typography>

        <Box component='form' sx={{ mt: "2rem" }} noValidate autoComplete='off'>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Item>
                <TextField
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid xs={6}>
              <Item>
                <TextField
                  id='outlined-basic'
                  label='Price'
                  variant='outlined'
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid xs={6}>
              <Item>
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
                      return <>Category</>;
                    }

                    return selected;
                  }}
                  fullWidth
                >
                  <MenuItem disabled value=''>
                    <em>Categories</em>
                  </MenuItem>
                  <MenuItem value={"Product 1"}>Product 1</MenuItem>
                </Select>
              </Item>
            </Grid>
            <Grid xs={12}>
              <Item>
                <Button variant='contained' size='large'>
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
