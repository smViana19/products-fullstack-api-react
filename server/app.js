const express = require('express');
const cors = require('cors');
const productsRoutes = require('./src/routes/products');
const categoriesRoutes = require('./src/routes/categories');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

module.exports = app;
