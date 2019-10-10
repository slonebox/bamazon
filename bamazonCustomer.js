var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var divider = "\n------------------------------------------";

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  //List all the products available for purchase
  readProducts();
  //Initiate the questions for a user to make a purchase
  purchaseProducts();
});

function purchaseProducts() {
  inquirer.prompt([
    {
      name: "item",
      message: "Please enter the ID# of the item you wish to purchase.",
      type: "number",
    },
    {
      name: "quantity",
      message: "How many would you like to purchase?",
      type: "number",
    }
  ]).then(function (answer) {
    console.log(connection.query("SELECT price FROM products WHERE ?",
    {
      item_ID: answer.ID
    }));
    console.log("Item ID #: " + answer.item);
    console.log("Quantity: " + answer.quantity);
    // validate(answer.item, answer.quantity);
    console.log("Inventory: " + (50 - answer.quantity));
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [{
        stock_quantity: --answer.quantity
      },
      {
        item_ID: answer.item
      }],
      function (error) {
        if (error) throw err;
        console.log("Purchase successful!");
      });
    connection.end();
  });
};

function readProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("\nPRODUCTS" + divider);
    for (i = 0; i < res.length; i++) {
      console.log("ID #" + res[i].item_ID + ": " + res[i].product_name + " - $" + res[i].price);
    };
    console.log("\n ");
  });
};

function validate(id, amount) {
  inventory = connection.query(
    "SELECT stock_quantity FROM products WHERE item_ID ?",
    {
      item_ID: id
    });
  if (amount <= inventory) {
    console.log("Insufficient quantity");
    break;
  }
};
