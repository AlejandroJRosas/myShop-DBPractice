import pool from '../database'
import { Product } from '../types/product'

export const getProducts = async (): Promise<Product[]> => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id % 2 = 1')
  const [{ id, name }] = rows
  console.log(id, name)
  return rows
}

export const addProduct = async (product: Product): Promise<string> => {
  try {
    const result = await pool.query('INSERT INTO products SET ?', product)
    console.log('Resultado: ', result)
  } catch (error: any) {
    console.log(error.errno)
    return 'jodete mano'
  }
  return 'Fino mano'
}
