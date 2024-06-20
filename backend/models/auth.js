// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('./User');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
// const router = express.Router();

// // Register route
// router.post('/register', async (req, res) => {
//   const { fullName, email, mobile, password, confirmPassword } = req.body;

//   // Validate input
//   if (!fullName || !email || !mobile || !password || !confirmPassword) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   if (!validateEmail(email)) {
//     return res.status(400).json({ message: 'Please enter a valid email address' });
//   }

//   if (!validateMobile(mobile)) {
//     return res.status(400).json({ message: 'Mobile number must be 10 digits' });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   if (!validatePassword(password)) {
//     return res.status(400).json({ message: 'Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character' });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create new user
//     const newUser = new User({
//       fullName,
//       email,
//       mobile,
//       password
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Email validation function
// const validateEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// // Mobile validation function
// const validateMobile = (mobile) => {
//   const mobileRegex = /^\d{10}$/;
//   return mobileRegex.test(mobile);
// };

// // Password validation function
// const validatePassword = (password) => {
//   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//   return passwordRegex.test(password);
// };

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Check if user exists
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found.' });
//       }
  
//       // Validate password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials.' });
//       }
  
//       // Create JWT payload
//       const payload = {
//         user: {
//           id: user.id,
//           email: user.email,
//           // Add more fields as needed
//         }
//       };
  
//       // Sign JWT
//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         { expiresIn: 3600 }, // Token expires in 1 hour (you can adjust this)
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });
  

// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const speakeasy = require('speakeasy');
const User = require('./User');
const transporter = require('./mailer');
dotenv.config();
const router = express.Router();

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Mobile validation function
const validateMobile = (mobile) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

// Password validation function
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return passwordRegex.test(password);
};

// Register route
router.post('/register', async (req, res) => {
  const { fullName, email, mobile, password, confirmPassword } = req.body;

  if (!fullName || !email || !mobile || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  if (!validateMobile(mobile)) {
    return res.status(400).json({ message: 'Mobile number must be 10 digits' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      mobile,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate OTP
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET,
      encoding: 'base32',
      step: 300,
    });

    // Send OTP to user's email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending OTP email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'OTP sent to email' });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Verify OTP route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isValid = speakeasy.totp.verify({
      secret: process.env.OTP_SECRET,
      encoding: 'base32',
      token: otp,
      step: 300,
      window: 1,
    });

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
