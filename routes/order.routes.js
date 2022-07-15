const express = require('express');

const OrdersService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addOrderProductSchema
} = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-product',
  validatorHandler(addOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrderProduct = await service.addOrderProduct(body);
      res.status(201).json(newOrderProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const orderDeleted = await service.delete(id);
      res.status(201).json({ message: 'order deleted', data: orderDeleted });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
