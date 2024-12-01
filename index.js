const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
// Load environment variables from .env file
require('dotenv').config();
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"));

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
/* let query = "INSERT INTO user (id, username, email, password) VALUES ?";

let data = [];
for(let i=1; i<=100; i++){
  data.push(getRandomUser()); //100 fake users...
} */

/*   try {
    connection.query(query, [data], (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  } */
  

/* connection.end();   */

//Home ROUTE.....
app.get("/", (req,res)=>{
  let q = "SELECT count(*) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", {count});
    });
  } catch (err) {
    console.log(err);
    res.send("Database error!")
  }
  
});

//GET /user --> Fetch and show (userid, username, email) of all users!
app.get("/user", (req, res)=>{
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, users)=>{
      if (err) throw err;
      res.render("showusers.ejs", {users})
    });
  }catch (err){
    console.log(err);
    res.send("Database error!")
  }

});

//Edit route. This route is created in 2 different ways:
//1. GET /user/:id/edit --> To get form to edit the username, based on id. This form will require password.
// 2. PATCH /user/:id  --> To edit username, if correct password was entered in form.

//Edit route:
app.get("/user/:id/edit", (req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id= '${id}'`;
  try {
    connection.query(q, (err, result)=>{
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  }catch (err){
    console.log(err);
    res.send("Database error!")
  }
  
});

//PATCH Request



app.listen("8080", ()=>{
  console.log("Server is listening to port 8080")
})




