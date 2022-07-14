const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
    });

    return rta;
  }

  async findOne(id) {
    const rta = await models.Category.findByPk(id);
    if (!rta) {
      throw boom.notFound('Category not found');
    }

    return rta;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const updatedAt = new Date().toISOString();

    const categoryChanges = { ...changes, updatedAt };
    const rtaCategory = await category.update(categoryChanges);

    return rtaCategory;
  }

  async delete(id) {
    const category = await this.findOne(id);
    const deletedAt = new Date().toISOString();

    const rtaCategory = await category.update({ deletedAt: deletedAt });

    return rtaCategory;
  }

  async findCategoryProducts(id) {
    const rta = await models.Category.findByPk(id, {
      include: 'products',
    });
    if (!rta) {
      throw boom.notFound('Category not found');
    }

    return rta;
  }
}

module.exports = CategoryService;
