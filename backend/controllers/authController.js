const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.status(200).json({ token });
};

// Forgot Password (simplified)
exports.forgotPassword = async (req, res) => {
  // Here you would send an email with a reset token (use a service like SendGrid)
  res.status(200).json({ message: 'Password reset email sent' });
};
