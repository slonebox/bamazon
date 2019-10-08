var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.USER,

  // Your password
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
    console.log("This is the start function.");
}