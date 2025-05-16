// db.js (for use across API routes)

const mysql = require('mysql2');

// Create a connection pool instead of a single connection
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

// Export promise-based version for async/await
const db = pool.promise();

module.exports = db;
