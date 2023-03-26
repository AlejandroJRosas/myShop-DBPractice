import express from 'express'
import pool from '../../database'

const router = express.Router()

const tables = ['orders', 'baskets', 'products', 'categories', 'users', 'roles']

router.get('/', (_req, res) => {
  void (async () => {
    try {
      for (let i = 0; i < tables.length; i++) {
        await pool.query('DROP TABLE ' + tables[i])
      }

      await pool.query(
        'CREATE TABLE roles(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(31) NOT NULL,createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)'
      )
      await pool.query(
        'CREATE TABLE categories(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(31) NOT NULL,createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)'
      )
      await pool.query(
        'CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(31) NOT NULL,username VARCHAR(31) NOT NULL,password VARCHAR (63) NOT NULL,cash FLOAT NOT NULL DEFAULT 0,roleId INT NOT NULL DEFAULT 0,createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES roles (id))'
      )
      await pool.query(
        'CREATE TABLE baskets(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,shipped BOOLEAN NOT NULL DEFAULT FALSE,totalPrice FLOAT NOT NULL DEFAULT 0,userId INT NOT NULL,createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id))'
      )
      await pool.query(
        'CREATE TABLE products(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(31) NOT NULL,unitPrice FLOAT NOT NULL DEFAULT 0,unitsOnStock INT NOT NULL DEFAULT 0,categoryId INT DEFAULT NULL,createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES categories (id))'
      )
      await pool.query(
        'CREATE TABLE orders(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,orderPrice FLOAT NOT NULL DEFAULT 0,quantity INT NOT NULL DEFAULT 0,basketId INT NOT NULL,productId INT NOT NULL,createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,CONSTRAINT fk_basket_id FOREIGN KEY (basketId) REFERENCES baskets (id),CONSTRAINT fk_product_id FOREIGN KEY (productId) REFERENCES products (id))'
      )

      res.status(200).send('Tablas Recreadas')
    } catch (error: any) {
      res.send(error.message)
    }
  })()
})

export default router
