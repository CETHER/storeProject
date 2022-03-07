const faker = require('faker');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      price: faker.image.imageUrl(),
    });
  }
  res.json(products);
});


router.get('/filter', (req, res) => {
  res.send('Yo soy un fileter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (id === '999') {
    res.status(404).json({
      message: 'Product not found',
    });
  } else {
    res.status(200).json({
      id,
      name: 'Product 2',
      price: 800,
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;

  res.json({ message: 'created', data: body });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.status(201).json({ message: 'updated', data: body, id });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({ message: 'deleted', id });
});

module.exports = router;
