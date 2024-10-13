const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],  // Allow your frontend during development and production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  credentials: true,  // Allow credentials (cookies, authentication headers, etc.)
  optionsSuccessStatus: 200,  // Some legacy browsers choke on 204
};

// Use CORS middleware
app.use(cors(corsOptions));

// Manually handle preflight OPTIONS requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests for POST, PUT, DELETE
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

// Routes
const tutorRoutes = require('./routes/tutors');
app.use('/api/tutors', tutorRoutes);

const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
