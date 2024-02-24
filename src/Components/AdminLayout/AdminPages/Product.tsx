import { useState } from "react";
import {
  Stack,
  Select,
  FormControl,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Product() {
  const [product, setProduct] = useState("");
  const handleChange = (e: SelectChangeEvent) => {
    setProduct(e.target.value);
  };
  return (
    <>
      <h1>Product</h1>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        alignItems='center'
        justifyContent='space-between'
        useFlexGap
      >
        <div style={{ flexBasis: "50%" }}>
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
            >
              <MenuItem disabled value=''>
                <em>Search Products</em>
              </MenuItem>
              <MenuItem value={"Product 1"}>Product 1</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant='contained' size='large'>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-evenly'
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                width={20}
                height={20}
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </Stack>
        </Button>
      </Stack>
      <h3>
        The agitated stakeholders were still discussing the impact of Friday’s
        increase before they were once again hit by yet another hike which
        commentators feared may lead to the collapse of the import business and
        difficulty of the Nigeria Customs Service to meet its N5.1 trillion
        revenue target for 2024.
      </h3>
      <ProductResult />
    </>
  );
}

export function ProductResult() {
  return (
    <div>
      <header>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
          useFlexGap
        >
          <span>Name</span>
          <span>Price</span>
          <span>Category</span>
          <span style={{ flexBasis: "40%" }}>Date</span>
          <span>Action</span>
        </Stack>
      </header>
    </div>
  );
}
