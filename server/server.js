const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS config for frontend at localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ✅ Middleware to parse cookies and request bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🧾 Request logger in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// 🔗 API routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/tags', require('./routes/tagRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// 🚫 Avoid duplicate route registration
// ✅ You already registered /api/categories above — no need to repeat

// 🔑 Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

// 🔥 Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});


// 🛠️ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// 💥 Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

module.exports = app;