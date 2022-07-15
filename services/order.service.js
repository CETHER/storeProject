const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const rta = await models.Order.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });

    return rta;
  }

  async findOne(id) {
    const rta = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'order_product',
      ],
    });
    if (!rta) {
      throw boom.notFound('Order not found');
    }

    return rta;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedAt = new Date().toISOString();

    const orderChanges = { ...changes, updatedAt };
    const rtaOrder = await order.update(orderChanges);

    return rtaOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    const deletedAt = new Date().toISOString();

    const rtaOrder = await order.update({ deletedAt: deletedAt });

    return rtaOrder;
  }

  async addOrderProduct(data) {
    const newOrderProduct = await models.OrderProduct.create(data);
    return newOrderProduct;
  }
}

module.exports = OrdersService;
