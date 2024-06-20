import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, TextField, Button, Checkbox, FormControlLabel, Snackbar } from "@mui/material";
import axios from 'axios';
import "./App.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMessage("");

    if (!validateEmail(email)) {
      showAlert("Please enter a valid email address.");
      return;
    }

    if (password === "") {
      showAlert("Password cannot be blank.");
      return;
    }

    if (!termsChecked) {
      showAlert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      showAlert(response.data.message, "success");
      localStorage.setItem('email', email);
      window.location.href = '/verify-otp';
    } catch (error) {
      if (error.response && error.response.data) {
        showAlert(error.response.data.message || "Login failed");
      } else {
        showAlert("Login failed. Please try again later.");
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showAlert = (message, severity = "error") => {
    setAlertMessage({ message, severity });
    setAlertOpen(true);
  };

  return (
    <div className="wrapper">
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity={alertMessage.severity} sx={{ width: '100%' }}>
          {alertMessage.message}
        </Alert>
      </Snackbar>
      <form onSubmit={handleLogin}>
        <h1>Login Here</h1>
        <div className="input-box">
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="terms-and-conditions">
          <FormControlLabel
            control={
              <Checkbox
                checked={termsChecked}
                required
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
            }
            label="For Terms and Conditions"
          />
        </div>
        <Button type="submit" variant="contained" color="primary" className="btn">
          Login
        </Button>
        <div className="register-link">
          <span style={{ marginRight: "10px" }}></span>
          <Link to="/signup">
            Don't have an account? Signup here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
