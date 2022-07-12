const config = require('../config/config');

const { mysql, postgres } = config;
const { dbHost, dbPort, dbUser, dbPassword, dbName, dbAdmin } = mysql;

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `${dbAdmin}://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  development: {
    url: URI,
    dialog: `${dbAdmin}`,
  },
  production: {
    url: URI,
    dialog: `${dbAdmin}`,
  },
};
