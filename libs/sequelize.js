const { Sequelize } = require('sequelize');

const config = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.postgres.dbUser);
const PASSWORD = encodeURIComponent(config.postgres.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.postgres.dbHost}:${config.postgres.dbPort}/${config.postgres.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
