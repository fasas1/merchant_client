import React, { useState } from "react";
import inputHelper from "../Helper";
import {
  Box,
  Typography,
  Grid,
  Toolbar,

  TextField,
  Button,
} from "@mui/material";
import { useLoginUserMutation } from "../Apis/authApi";
import { apiResponse, userModel } from "../Interfaces";
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { useNavigate } from "react-router-dom";


function Login() {
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
   
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const response : apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
  
    })

    if(response.data){
       console.log(response.data)
       const {token} = response.data.result
       const {fullName, id, email, role} :userModel = jwt_decode(token)
       localStorage.setItem("token", token)
       dispatch(setLoggedInUser({fullName, id, email, role }))
       navigate("/");
    }else if(response.error){
        console.log(response.error.data.errorMessages[0])
        setError(response.error.data.errorMessages[0])
    }
    setLoading(false)
    // Handle form submission here
   // console.log("Form Submitted with data:", userInput);
  };
  return (
    <Box sx={{ p: 5 }}>
    <Toolbar />
    <Grid container>

      <Grid  >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 0.9 },
           
          }}
        
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5">Login</Typography>
         
          <TextField
            id="filled-basic"
            label="Username"
            variant="outlined"
            color="secondary"
            required
            fullWidth
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
            type={"password"}
            name="password"
            fullWidth
            value={userInput.password}
            onChange={(e) => handleUserInput(e as any)} // Use type assertion here
          />
          {error && <Typography variant="body2" color="red">{error}</Typography>}
          <Button type="submit" variant="contained" color="secondary" >
           Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
  )
}

export default Login