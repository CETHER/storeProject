const express = require('express');
const ProductService = require('../services/product.service.js');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const productService = new ProductService();

router.get('/', async (req, res) => {
  const products = await productService.find();
  res.json(products);
});

router.get('/filter', async (req, res) => {
  res.send('Yo soy un fileter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const newProduct = await productService.create(body);

    res.status(201).json({ message: 'created', data: newProduct });
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const productUpdated = await productService.update(id, body);

      res.status(201).json({ message: 'updated', data: productUpdated });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const productDeleted = await productService.delete(id);

  res.json({ message: 'deleted', productDeleted });
});

module.exports = router;
