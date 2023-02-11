import express from 'express'
import { addProduct, getProducts } from '../../controllers/products'
import { Product } from '../../types/product'

const router = express.Router()

router.get('/', (_req, res) => {
  void (async () => {
    try {
      const r = await getProducts()
      res.send(r)
    } catch (e) {
      console.error(e)
    }
  })()
})

router.post('/', (req, res) => {
  const { name, unitPrice, unitsOnStock } = req.body as Product
  const newProduct = {
    name,
    unitPrice,
    unitsOnStock
  }
  const resultado = async (): Promise<Product> => await addProduct(newProduct)
  resultado()
    .then((prom) => res.send(prom))
    .catch((error) => res.send(error))
})

export default router
