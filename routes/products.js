const express = require('express');
const ProductService = require('../services/product.js');

const router = express.Router();
const productService = new ProductService();

router.get('/', (req, res) => {
  const products = productService.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un fileter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productService.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = productService.create(body);

  res.status(201).json({ message: 'created', data: newProduct });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const productUpdated = productService.update(id, body);

  res.status(201).json({ message: 'updated', data: productUpdated });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const productDeleted = productService.delete(id);

  res.json({ message: 'deleted', productDeleted });
});

module.exports = router;
