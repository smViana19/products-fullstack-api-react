const express = require('express');
const cors = require('cors');
const productsRoutes = require('./src/routes/products');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);

module.exports = app;
