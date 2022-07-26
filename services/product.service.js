const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {
	constructor() {}

	async create(data) {
		const newProduct = await models.Product.create(data);
		return newProduct;
	}

	async find(query) {
		const options = {
			where: {
				deletedAt: {
					[Op.is]: null,
				},
			},
			include: ['category'],
		};

		const { limit, offset, price, price_min, price_max } = query;

		if (limit && offset) {
			options.limit = parseInt(limit);
			options.offset = parseInt(offset);
		}

		if (price) {
			options.where.price = price;
		}

		if (price_min && price_max) {
			options.where.price = {
				[Op.between]: [price_min, price_max],
			};
		}

		const rta = await models.Product.findAll(options);

		return rta;
	}

	async findOne(id) {
		const rta = await models.Product.findByPk(id, {
			include: 'category',
		});
		if (!rta) {
			throw boom.notFound('Product not found');
		}

		return rta;
	}

	async update(id, changes) {
		const product = await this.findOne(id);
		const updatedAt = new Date().toISOString();

		const productChanges = { ...changes, updatedAt };
		const rtaProduct = await product.update(productChanges);

		return rtaProduct;
	}

	async delete(id) {
		const product = await this.findOne(id);
		const deletedAt = new Date().toISOString();

		const rtaProduct = await product.update({ deletedAt: deletedAt });

		return rtaProduct;
	}
}

module.exports = ProductsService;
