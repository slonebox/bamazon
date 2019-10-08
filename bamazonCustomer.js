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
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  readProducts();
});

function purchaseProducts() {
    inquirer.prompt({
        name: "item",
        message: "What item would you like to purchase?",
        type: "list",
        choices: ["Arrows", "Blue Fire", "Blue Potion", "Bombchus", "Bombs", "Bug", "Deku Nuts", "Deku Seeds", "Deku Shield", "Deku Stick", "Fairy", "Fish", "Goron Tunic", "Green Potion", "Heart", "Hylian Shield", "Lon Lon Milk", "Poe", "Red Potion", "Zora Tunic"]
    }, 
    {
        name: "quantity",
        message: "How many would you like to purchase?",
        type: "number"
    }).then(function(res){
        connection.query();
    });
};

function readProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("\nPRODUCTS" + divider);
      for (i=0; i < res.length; i++) {
          console.log("Item #" + res[i].item_ID + ": " + res[i].product_name + " - $" + res[i].price);
      };
      console.log("\n ");
      connection.end();
    });
  };