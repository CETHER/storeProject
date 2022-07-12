const { Sequelize } = require('sequelize');

const config = require('../config/config');
const setupModels = require('../db/models');

const { mysql, postgres } = config;
const { dbHost, dbPort, dbUser, dbPassword, dbName, dbAdmin } = mysql;

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `${dbAdmin}://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: `${dbAdmin}`,
  logging: true,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
