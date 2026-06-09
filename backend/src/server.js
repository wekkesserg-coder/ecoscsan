const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const materialRoutes = require('./routes/materials');
const scanRoutes = require('./routes/scans');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/scans', scanRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
