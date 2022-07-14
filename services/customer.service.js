const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const UserService = require('./user.service');
const userService = new UserService();

class CustomerService {
  constructor() {}

  async create(data) {
    let newCustomer;
    if (data.user) {
      newCustomer = await models.Customer.create(data, {
        include: ['user'],
      });
    } else {
      const user = {
        email: 'email@default.com',
        role: 'new',
        password: '123',
      };

      const newData = { ...data, user };
      newCustomer = await models.Customer.create(newData, {
        include: ['user'],
      });
    }
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
      include: ['user'],
    });

    return rta;
  }

  async findOne(id) {
    const rta = await models.Customer.findByPk(id, { include: 'user' });
    if (!rta) {
      throw boom.notFound('Customer not found');
    }

    return rta;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const user = await userService.findOne(customer.userId);
    const updatedAt = new Date().toISOString();

    const customerChanges = { ...changes, updatedAt };
    const userChanges = { ...changes.user, updatedAt };

    const rtaCustomer = await customer.update(customerChanges);
    const rtaUser = await user.update(userChanges);
    rtaCustomer.dataValues.user = rtaUser;

    return rtaCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const user = await userService.findOne(customer.userId);
    const deletedAt = new Date().toISOString();

    const rtaCustomer = await customer.update({ deletedAt: deletedAt });
    const rtaUser = await user.update({ deletedAt: deletedAt });
    rtaCustomer.dataValues.user = rtaUser;

    return rtaCustomer;
  }
}

module.exports = CustomerService;
