
const mysql = require('mysql2');

// connection
const connection = mysql.createConnection({
  host: 'db-archstudio-inventory.c3mq88yse062.eu-central-1.rds.amazonaws.com',
  user: 'admin',  
  password: 'Archstudio123', 
  database: 'arch_studio',
  port: 3306  
});

// Connect to the database
connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as ID:', connection.threadId);
  });
  

  const queryDatabase = () => {
    const sql = 'SELECT * FROM Products'; 
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err.stack);
        return;
      }

      console.log(JSON.stringify(results, null, 2)); 
    });
  };
  

  queryDatabase();
  

  connection.end();

  