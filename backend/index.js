// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');  // Correctly import your routes
const authRoutes = require('./routes/authRoutes');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON requests

// Routes
app.use('/api', taskRoutes);  // Mount task routes
app.use('/user', authRoutes);  // Mount task routes


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
