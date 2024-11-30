const { faker } = require('@faker-js/faker'); 
const mysql = require('mysql2');


// Create the connection to database
 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Node_with_SQL',
    password: '@#mysql@#'
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





