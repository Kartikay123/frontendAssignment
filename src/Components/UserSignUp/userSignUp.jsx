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
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

export default function UserSignUp() {
  const { signup } = useAuth(); // Assuming there's a function checkEmailExists to check if email exists
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailExist, setemailExist] = useState(false); // State to track if email exists
  const [emailInvalid, setEmailInvalid] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    // Validate fields
    if (!firstName) {
      setFirstNameError(true);
      return;
    }
    if (!lastName) {
      setLastNameError(true);
      return;
    }
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setPasswordError(true);
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      Navigate("/dashboard");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        setEmailError(true);
        setemailExist(true);
      } else if (error.message.includes("auth/invalid-email")) {
        setEmailInvalid(true);
      } else {
        alert("Failed to create an account: " + error.message);
      }
    } finally {
      setLoading(false);
    }
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
                      error={firstNameError}
                      helperText={firstNameError && "First Name is required"}
                      onChange={() => setFirstNameError(false)}
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
                      error={lastNameError}
                      helperText={lastNameError && "Last Name is required"}
                      onChange={() => setLastNameError(false)}
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
                      error={emailError || emailInvalid} // Update error state
                      helperText={
                        (emailError &&
                          (emailExist
                            ? "Email already exists"
                            : "Email is required")) ||
                        (emailInvalid && "Invalid email format") // Display error message for invalid email
                      }
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
                      error={passwordError}
                      helperText={
                        passwordError
                          ? "Password must contain 1 lowercase letter, 1 uppercase letter, 1 special character, 1 number, and have a minimum length of 8 characters"
                          : ""
                      }
                      onChange={() => setPasswordError(false)}
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
    </div>
  );
}
