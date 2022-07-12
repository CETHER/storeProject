require('dotenv').config();

const postgres = {
  dbAdmin: 'postgres',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT_POSTGRES,
  dbUser: process.env.DB_USER_POSTGRES,
  dbPassword: process.env.DB_PASSWORD_POSTGRES,
  dbName: process.env.DB_NAME,
};

const mysql = {
  dbAdmin: 'mysql',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT_MYSQL,
  dbUser: process.env.DB_USER_MYSQL,
  dbPassword: process.env.DB_PASSWORD_MYSQL,
  dbName: process.env.DB_NAME,
};

const api = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
};

module.exports = { mysql, postgres, api };
