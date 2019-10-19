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
connection.connect(function start(err) {
  if (err) throw err;
  //List all the products available for purchase
  readProducts(purchaseProducts);
});


// FUNCTIONS DEFINED
function start(err) {
  if (err) throw err;
  //List all the products available for purchase
  readProducts(purchaseProducts)
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
    connection.query("SELECT price, stock_quantity FROM products WHERE ?",
      {
        item_ID: answer.item
      }, function (err, result) {

        //Verifies if there is enough inventory to fulfill the purchase request, and restarts the application if the inventory is insufficient
        productInventory = result[0].stock_quantity;
        if (productInventory < answer.quantity) {
          console.log("Insufficient quantity!");
          start(err);
        } else {
          //Assigns the product price to a variable and calculates the cost of the transaction
          productPrice = result[0].price;
          transactionCost = productPrice * purchaseQuantity;

          //Displays all the transaction detail in the console
          console.log(divider)
          console.log("TRANSACTION DETAILS     ")
          console.log("\nProduct ID# " + itemID);
          console.log("Product Price   : $" + productPrice);
          console.log("Quantity        :  " + purchaseQuantity);
          console.log("                 ____________");
          console.log("Total Cost      : $" + transactionCost);
          console.log(divider);
        };



      });

    var purchaseQuantity = answer.quantity;
    var itemID = answer.item;

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

function readProducts(cb) {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("\nPRODUCTS" + divider);
    for (i = 0; i < res.length; i++) {
      console.log("ID #" + res[i].item_ID + ": " + res[i].product_name + " - $" + res[i].price);
    };
    console.log("\n ");
    cb();
  });
};