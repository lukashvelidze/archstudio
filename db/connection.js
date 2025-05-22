// db/connection.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'db-archstudio-inventory.c3mq88yse062.eu-central-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Archstudio123',
  database: 'arch_studio',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
