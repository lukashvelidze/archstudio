// mysql2 მოდულის იმპორტი
const mysql = require('mysql2');

// მონაცემთა ბაზასთან კავშირის შექმნა
const connection = mysql.createConnection({
  host: 'db-archstudio-inventory.c3mq88yse062.eu-central-1.rds.amazonaws.com',  // მონაცემთა ბაზის მასპინძელი
  user: 'admin',  // მომხმარებლის სახელი
  password: 'Archstudio123',  // პაროლი
  database: 'arch_studio',  // მონაცემთა ბაზის სახელი
  port: 3306  // პორტი, რომელიც გამოიყენება MySQL-ისთვის (სტანდარტული 3306)
});

// მონაცემთა ბაზასთან კავშირის დადგმვა
connection.connect(err => {
  if (err) {
    // თუ მოხდა შეცდომა კავშირისას, გამოიტანს შეცდომის შეტყობინებას
    console.error('Error connecting to the database:', err.stack);
    return;  // გაუმართავი კავშირის შემთხვევაში შეწყვეტს კოდის შესრულებას
  }
  // თუ კავშირი წარმატებით გაიშვა, დააბეჭდავს კავშირის ID-ს
  console.log('Connected to the database as ID:', connection.threadId);
});

// ფუნქცია მონაცემთა ბაზიდან მონაცემების დასაბრუნებლად
const queryDatabase = () => {
  const sql = `
SELECT p.* 
FROM Products p
JOIN Categories c ON p.category_id = c.id
WHERE c.name = 'Detection';
`;  // SQL-query, რომელიც არკვევს ყველა პროდუქტს
  connection.query(sql, (err, results) => {
    if (err) {
      //შეცდომის შეტყობინებას
      console.error('Error fetching data:', err.stack);
      return;
    }

    // მონაცემების მიღების შემდეგ დააბეჭდავს შედეგებს JSON ფორმატში
    console.log(JSON.stringify(results, null, 2));
  });
};

// ფუნქციის გამოძახება, რომელიც ამჟამად ახორციელებს მონაცემების მოთხოვნას
queryDatabase();

// კავშირის გაწყვეტა, როდესაც მონაცემები დასრულდება
connection.end();