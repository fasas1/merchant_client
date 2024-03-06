import { useState } from "react";
// Material UI
import {
  Stack,
  FormControl,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Typography,
} from "@mui/material";
// Components
import Orders from "./Components/Orders";

export default function Order() {
  const [orderStatus, setOrderStatus] = useState("");
  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        alignItems='center'
        justifyContent='space-between'
        useFlexGap
      >
        <Typography variant='h3' fontWeight={700}>
          Order List
        </Typography>
        <div style={{ flexBasis: "50%", width: "100%" }}>
          <FormControl fullWidth>
            <Select
              defaultValue={orderStatus}
              labelId='filter-order'
              id='filter-order'
              value={orderStatus}
              label='filter-order'
              onChange={(e: SelectChangeEvent) =>
                setOrderStatus(e.target.value)
              }
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (!selected) {
                  return <em>Filter Order by Status</em>;
                }

                return selected;
              }}
              fullWidth
            >
              {orderStatus && (
                <MenuItem value=''>
                  <em style={{ color: "red" }}>Clear Filter</em>
                </MenuItem>
              )}
              {["pending", "paid"].map((status, index) => (
                <MenuItem
                  key={index}
                  value={status}
                  sx={{ textTransform: "capitalize" }}
                >
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Stack>
      <Orders orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
    </div>
  );
}
