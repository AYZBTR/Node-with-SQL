const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
// Load environment variables from .env file
require('dotenv').config();

// Create the connection to the database using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};

// A simple query
// Inserting new data
let query = "INSERT INTO user (id, username, email, password) VALUES ?";

let data = [];
for(let i=1; i<=100; i++){
  data.push(getRandomUser()); //100 fake users...
}

 try {
  connection.query(query, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

connection.end(); 





