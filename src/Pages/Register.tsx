import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import RegIcon from "../Assets/Group 41.png";
import { SD_Roles } from "../Utility/SD";
import inputHelper from "../Helper";

function Register() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Submitted with data:", userInput);
  };

  return (
    <Box sx={{ p: 5 }}>
      <Toolbar />
      <Grid container>
        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={6}>
          <img
            src={RegIcon}
            alt="Registration Icon"
            style={{ width: "56%", paddingTop: "50px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 0.7, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography variant="h5">Sign Up Here</Typography>
            <TextField
              id="filled-basic"
              label="Name"
              variant="outlined"
              color="secondary"
              name="name"
              required
              value={userInput.name}
              onChange={(e) => handleUserInput(e as any)} // Use type assertion here
            />
            <TextField
              id="filled-basic"
              label="Username"
              variant="outlined"
              color="secondary"
              required
              name="userName"
              value={userInput.userName}
              onChange={(e) => handleUserInput(e as any)} // Use type assertion here
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              required
              name="password"
              value={userInput.password}
              onChange={(e) => handleUserInput(e as any)} // Use type assertion here
            />
            <FormControl
              sx={{
                "& > :not(style)": { m: 0.7, width: "45ch" },
              }}
            >
              <InputLabel>Select Role</InputLabel>
              <Select
                name="role"
                value={userInput.role}
                onChange={(e) => handleUserInput(e as any)} // Use type assertion here
              >
                <MenuItem value={`${SD_Roles.CUSTOMER}`}>Customer</MenuItem>
                <MenuItem value={`${SD_Roles.ADMIN}`}>Admin</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="secondary" sx={{ m: 1 }}>
              Create Account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;