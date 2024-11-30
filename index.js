const { faker } = require('@faker-js/faker'); 
const mysql = require('mysql2');
// Load environment variables from .env file
require('dotenv').config();

/* // Create the connection to database
 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Node_with_SQL',
    password: '@#mysql@#'
});  */
// Create the connection to the database using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

// A simple query
 try {
    connection.query("SHOW TABLES", (err, result) => {
        if (err) throw err;
        console.log(result);
    });
} catch (err) {
    console.log(err);
}
 
connection.end();





