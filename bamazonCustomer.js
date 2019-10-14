var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var divider = "\n------------------------------------------";

// CONNECTION INFORMATION
var connection = mysql.createConnection({
  host: "localhost",

  // PORT
  port: 3306,

  // USERNAME
  user: "root",

  // PASSWORD
  password: process.env.PASSWORD,
  // DATABASE
  database: process.env.DATABASE
});

// INITIALIZE CONNECTION, RUN PROGRAM
connection.connect(function start (err) {
  if (err) throw err;
  //List all the products available for purchase
  readProducts();
  //Initiate the questions for a user to make a purchase
  purchaseProducts();
});


// FUNCTIONS DEFINED
function start (err) {
  if (err) throw err;
  //List all the products available for purchase
  readProducts();
  //Initiate the questions for a user to make a purchase
  purchaseProducts();
}

function purchaseProducts() {
  //Serves question to user for inputting product purchase details
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
    connection.query("SELECT price FROM products WHERE ?",
      {
        item_ID: answer.item
      });
    console.log("Item ID #: " + answer.item);
    console.log("Quantity: " + answer.quantity);

    //Verifies if quanity requested exceeds amount in store
    productInventory = checkInventory(answer.item);
    if(productInventory < answer.quantity) {
      console.log("Insufficient quantity!");
      start(err);
    };

    //Checks the price of that item, then calculates the total cost of the transaction
    productPrice = checkPrice(answer.item);
    transactionCost = (productPrice * answer.quantity);
    console.log("Product Price   : " + productPrice);
    console.log("Quanity         : " + answer.quantity);
    console.log("______________________________");
    console.log("Transaction Cost: " + transactionCost);

    connection.query(
      "UPDATE products SET ? WHERE ?",
      [{
        stock_quantity: answer.quantity--
      },
      {
        item_ID: answer.item
      }],
      function (err) {
        if (err) throw err;

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

function checkPrice(id) {
  connection.query("SELECT price FROM products WHERE?",
  {
    item_ID: id
  }, function (err, res) {
    if (err) {
      throw err;
    } 
    var price = res[0].price
    return price;
  });
};

function checkInventory(id) {
  connection.query("SELECT stock_quantity FROM products WHERE?",
  {
    item_ID: id
  }, function (err, res) {
    if (err) {
      throw err;
    } 
    inventory = res[0].stock_quantity;
    return inventory;
  });
};