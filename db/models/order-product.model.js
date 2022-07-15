const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');
const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class OrderProduct extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
  OrderProduct,
};
