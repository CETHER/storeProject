const { Pool } = require('pg');
const config = require('../config/config');

const USER = encodeURIComponent(config.postgres.dbUser);
const PASSWORD = encodeURIComponent(config.postgres.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.postgres.dbHost}:${config.postgres.dbPort}/${config.postgres.dbName}`;

const pool = new Pool({
  connectionString: URI,
});

module.exports = pool;
