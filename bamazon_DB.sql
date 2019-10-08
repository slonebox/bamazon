CREATE DATABASE bamazon_DB;

DROP DATABASE IF EXISTS bamazon_db;

USE bamazon_DB;

CREATE TABLE products (
	item_ID INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY (item_ID)
    );
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
	("Arrows", "Weaponry", 60.00, 50),
    ("Blue Fire", "Miscellaneous", 300.00, 50),
    ("Blue Potion", "Recovery", 100.00, 50),
    ("Bombchus", "Weaponry", 180.00, 50),
    ("Bombs", "Weaponry", 35.00, 50),
    ("Bug", "Miscellaneous", 50.00, 50),
    ("Deku Nuts", "Weaponry", 15.00, 50),
    ("Deku Seeds", "Weaponry", 30.00, 50),
    ("Deku Shield", "Apparel", 40.00, 50),
    ("Deku Stick", "Weaponry", 10.00, 50),
    ("Fairy", "Recovery", 50.00, 50),
    ("Fish", "Miscellaneous", 200.00, 50),
    ("Goron Tunic", "Apparel", 300.00, 50),
    ("Green Potion", "Recovery", 30.00, 50),
    ("Heart", "Recovery", 10.00, 50),
    ("Hylian Shield", "Apparel", 80.00, 50),
    ("Lon Lon Milk", "Recovery", 10.00, 50),
    ("Poe", "Miscellaneous", 30.00, 50),
    ("Red Potion", "Recovery", 30.00, 50),
    ("Zora Tunic", "Apparel", 300.00, 50);


