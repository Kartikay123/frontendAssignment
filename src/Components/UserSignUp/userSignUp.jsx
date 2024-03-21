import "./userSignup.css";
import * as React from "react";
import { useState } from "react";
import Loader from "../Loader/loader";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function UserSignUp() {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    // Validate fields
    if (!firstName) {
      toast.error('First Name is required');
      return;
    }
    if(firstName.length>255)
    {
      toast.error('First Name should be less than 255 characters');
      return;
    }
    if (!lastName) {
      toast.error('Last Name is required');
      return;
    }
    if(lastName.length>255)
    {
      toast.error('Last Name should be less than 255 characters');
      return;
    }
    if (!email) {
      toast.error('Email is required');
      return;
    }
    if (!password) {
      toast.error('Password is required');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      toast.error('Password must contain 1 lowercase letter, 1 uppercase letter, 1 special character, 1 number, and have a minimum length of 8 characters');
      return;
    }
    const name= firstName + " " +lastName;
    const role= 'USER';
    const values= {name,email,password,role};
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        values
      );
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      console.log(response.data);
      if(response.data.statusCode===500)
      {
        toast.error('Email already exists');
      }
      else{
        Navigate('/login');
      }
       
    } catch (error) {
      if (error.response && error.response.status === 400) {
         
      } else if (error.message.includes("auth/invalid-email")) {
          toast.error('Invalid email format');
      } else {
          alert("Failed to create an account: " + error.message);
      }
  } finally {
      setLoading(false);
  }
}

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate password format
  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  return (
    <div className="signup-container">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="user-signup-container">
              <div className="signup-icon">
                <LockOutlinedIcon />
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
              </div>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                {loading && <Loader />}
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}
