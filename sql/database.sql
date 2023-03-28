CREATE DATABASE myshoptest;

-- USE DATABASE myshoptest;

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
