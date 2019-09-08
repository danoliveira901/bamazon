CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Grand Theft Auto V','Electronics',59.99,15),
    (' Skin Caviar Concealer Foundation','Health and Beauty',199.99,35),
    ('Dog leash','Pets',32.60,20),
    ('Electric Toothbrush','Electronics',119.90,20),
    ('Chanel bleu','Health and Beauty',120.99,18),
    ('MacBook Pro','Electronics',2.399,8),
    ('iPhone X Silicone Case','Accessories',39.90,37),
    ('Palram Hybrid Greenhouse  6 x 4 ','Garden',289.99,13),
    ('Rainbow Vacuum Cleaning System','Homewares',1.999,2),
    ('Wayfarer Sunglasses','Accessories',105.60,8);
    
    UPDATE products SET price = 599.90 WHERE item_id = 9;
	UPDATE products SET price = 999.90 WHERE item_id = 6;
    UPDATE products SET product_name = 'Skin Caviar Concealer Foundation' WHERE item_id = 2;
    