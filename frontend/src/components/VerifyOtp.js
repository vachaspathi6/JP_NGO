import React, { useState, useEffect } from "react";
import { Alert, TextField, Button, Snackbar } from "@mui/material";
import axios from 'axios';
import "../App.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      window.location.href = '/signin'; // Redirect to sign in if no email is found
    }
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setAlertMessage("");

    try {
        const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp
      });

      localStorage.setItem('token', response.data.token);
      showAlert("OTP verified successfully!", "success");
      window.location.href = '/dashboard';
      
    } catch (error) {
      if (error.response && error.response.data) {
        showAlert(error.response.data.message || "OTP verification failed");
      } else {
        showAlert("OTP verification failed. Please try again later.");
      }
    }
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
      <form onSubmit={handleVerifyOtp}>
        <h1>Enter OTP</h1>
        <div className="input-box">
          <TextField
            fullWidth
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap:'20%' }}>
          <Button className="btn" onClick={() => window.history.back()} style={{ marginRight: '10px' }}>
            Back
          </Button>
          <Button className="btn" type="submit">
            Verify OTP
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
