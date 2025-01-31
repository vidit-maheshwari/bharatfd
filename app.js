require('dotenv').config(); 

const express = require('express');
const connectDB = require('./config/db.config.js');
const faqRoutes = require('./routes/faq.route.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json());

// Routes
app.use('/api/faqs', faqRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});