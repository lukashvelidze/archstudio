const mysql = require('mysql2');

// Replace with your actual credentials
const connection = mysql.createConnection({
  host: 'db-archstudio-inventory.c3mq88yse062.eu-central-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Archstudio123',
  database: 'arch_studio',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    return;
  }

  console.log('✅ Connected to the database!');

  connection.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('❌ Query failed:', err.message);
    } else {
      console.log('📋 Tables:');
      console.table(results);
    }

    connection.end();
  });
});
