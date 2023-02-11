import pool from '../database'
import { Product } from '../types/product'

export const getProducts = async (): Promise<Product[]> => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id % 2 = 1')
  const [{ id, name }] = rows
  console.log(id, name)
  return rows
}

export const addProduct = async (product: Product): Promise<Product> => {
  const result = pool.query('INSERT INTO products SET ?', product)
  return result
}
