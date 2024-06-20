import React, { useState } from "react";
import "./App.css";
import {
  Alert,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import { Link} from "react-router-dom";
import axios from "axios";

const Signup = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setAlertMessage("");

    if (fullName.trim() === "") {
      showAlert("Full Name is required.");
      return;
    }

    if (!validateEmail(email)) {
      showAlert("Please enter a valid email address.");
      return;
    }

    if (!validateMobile(mobile)) {
      showAlert("Mobile number must be 10 digits.");
      return;
    }

    if (!validatePassword(password)) {
      showAlert(
        "Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Passwords do not match.");
      return;
    }

    if (!termsChecked) {
      showAlert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        email,
        mobile,
        password,
        confirmPassword,
      });
      showAlert(response.data.message, "success");
      window.location.href = '/';
    } catch (error) {
      showAlert(error.response.data.message || "Signup failed");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return passwordRegex.test(password);
  };

  const showAlert = (message, severity = "error") => {
    setAlertMessage({ message, severity });
    setAlertOpen(true);
  };

  return (
    <div className="wrapper">
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertMessage.severity}
          sx={{ width: "100%" }}
        >
          {alertMessage.message}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSignup}>
        <h1>Signup Here</h1>
        <div className="input-box">
          <TextField
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
            label="Mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            inputProps={{ maxLength: 10 }}
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
        <div className="input-box">
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="btn"
        >
          Signup
        </Button>
        <div className="register-link">
          <span style={{ marginRight: "10px" }}></span>
          <Link to="/">Already have an account? Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
