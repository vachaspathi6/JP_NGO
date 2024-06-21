import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './components/Dashboard';
import VerifyOtp from './components/VerifyOtp';
import Aboutus from './components/Aboutus';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App