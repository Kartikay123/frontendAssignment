import React,{useContext} from "react";
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
import Loader from "../Loader/loader";
import { useState } from "react";
import "./userLogin.css";
// import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../Context/LoginContext";
import axiosInstance from "../Context/axiosInstance";

const defaultTheme = createTheme();

export default function UserLogin() {
  const Navigate = useNavigate();
  // const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  async function handleSubmit(event) {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
  
    const email = data.get("email");
    const password = data.get("password");
  
    try {
      setLoading(true);
  
      // Validation check: Both email and password are empty
      if (!email && !password) {
        toast.error("Email and Password are required", {
          position: "top-right",
          theme: "colored",
        });
        return; // Exit the function
      }
  
      // Validation check: Email is empty
      if (!email) {
        toast.error("Email is required", {
          position: "top-right",
          theme: "colored",
        });
        return; 
      }
  
      // Validation check: Password is empty
      if (!password) {
        toast.error("Password is required", {
          position: "top-right",
          theme: "colored",
        });
        return; 
      }
      const values = { email, password }; // Store email and password in values variable
      // Attempt to login
      const response = await axiosInstance.post("/auth/signin", values);
      setIsLoggedIn(true);
      toast.success("Login Successful", 
      {
        position: "top-right",
        theme: "colored",
      });
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        Navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Please Enter Valid Credientials", {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
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
            <div className="user-login-container">
              <div className="login-icon">
              <LockOutlinedIcon />
              <Typography component="h1" variant="h5">
                Welcome to Deeptek
              </Typography>
              </div>
             
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {loading && <Loader />}
                
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
             
            </div>
          </Box>
          <ToastContainer />
        </Container>
      </ThemeProvider>
    </div>
  );
}
