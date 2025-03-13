const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const sendEmail =require('../utils/sendemail')
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const {checkSubscription} =require("../utils/crossapi-helper")
exports.register = async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        confirmpassword,
      } = req.body;
  
      // Check for missing fields
      if (!name || !email ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if passwords match
      if (password !== confirmpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      
  
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Create and save the new user
      const user = new User({
        name,
        email:email.toLowerCase(),
        password: hashedPassword,
        
      });
  
      await user.save();
    
      res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
      console.error("Error in registration:", err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ email:email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ error: 'User Not Found' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Password' });
        }

        // let response=await checkSubscription(user._id)
        // user.subscribed=response.success
        const token = jwt.sign(
          { 
            id: user._id, 
          },
          process.env.JWT_SECRET, 
          { expiresIn: process.env.JWT_EXPIRY } 
        );
        
        res.status(200).json({ token:token,user:user, });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
};
