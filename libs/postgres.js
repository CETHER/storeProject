const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'my_store',
    password: 'admin123',
    port: 5433,
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
