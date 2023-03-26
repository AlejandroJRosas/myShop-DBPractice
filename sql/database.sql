CREATE DATABASE myshoptest;

-- USE DATABASE myshoptest;

-- CREACIÓN DE TABLAS
CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(31) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE categories(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(31) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(31) NOT NULL,
  username VARCHAR(31) NOT NULL,
  password VARCHAR (63) NOT NULL,
  cash FLOAT NOT NULL DEFAULT 0,
  roleId INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES roles (id)
)

CREATE TABLE baskets(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  shipped BOOLEAN NOT NULL DEFAULT FALSE,
  totalPrice FLOAT NOT NULL DEFAULT 0,
  userId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id)
)

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(31) NOT NULL,
  unitPrice FLOAT NOT NULL DEFAULT 0,
  unitsOnStock INT NOT NULL DEFAULT 0,
  categoryId INT DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES categories (id)
)

CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  orderPrice FLOAT NOT NULL DEFAULT 0,
  quantity INT NOT NULL DEFAULT 0,
  basketId INT NOT NULL,
  productId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_basket_id FOREIGN KEY (basketId) REFERENCES baskets (id),
  CONSTRAINT fk_product_id FOREIGN KEY (productId) REFERENCES products (id)
)

--////////////////////////////////////////////////////

-- CONSULTA DE ATRIBUTOS DE TABLAS CREADAS
DESCRIBE roles;
DESCRIBE categories;
DESCRIBE users;
DESCRIBE baskets;
DESCRIBE products;
DESCRIBE orders;

-- ELIMINACIÓN DE TABLAS
DROP TABLE roles;
DROP TABLE categories;
DROP TABLE users;
DROP TABLE baskets;
DROP TABLE products;
DROP TABLE orders;

-- 🥩🥩🥩
-- ALTERACION DE TABLA
ALTER TABLE (tabla) MODIFY (modificacion)
ADD DROP MODIFY

-- INSERCION DE REGISTRO
INSERT INTO (tabla) (column) VALUE (columnValue)

-- VER REGISTRO
SELECT (DISTINCT) (column, ..., columnN) FROM (tabla) 
WHERE (conditions) 
ORDER BY (columnName ASC | DESC) 
LIMIT (numberOfRowsFromFirstRow) (OFFSET numberOfRowsToSkipFromFirstRow) 
GROUP BY (column)

COUNT() -- Returns the number of records returned by a select query
SUM()   -- Returns the sum of the values contained in the column
MAX()   -- Returns the max value of the column
MIN()   -- Returns the min value of the column
AVG()   -- Returns the average value of the column or expression

-- To update the value of columns in tables
UPDATE (table) SET (columnName) = (value) WHERE (condition)
-- NOTE: if the WHERE condition is absent then it will change all the rows
-- 🥩🥩🥩

-- TRIGGERS

-- CREATE TRIGGER categories_au AFTER UPDATE ON categories FOR EACH ROW
-- UPDATE categories SET updatedAt = CURRENT_TIMESTAMP()

-- CREATE TRIGGER categories_au
-- AFTER UPDATE ON categories
-- FOR EACH ROW
-- BEGIN
--     UPDATE categories SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
-- END

-- When sueño meets terrorismo
