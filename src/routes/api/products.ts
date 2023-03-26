import express from 'express'

import * as product from '../../controllers/products'
import { Product as ProductType } from '../../types/product'

const router = express.Router()

router.get('/', (_req, res) => {
  void (async () => {
    try {
      const r = await product.getProducts()
      res.send(r)
    } catch (e) {
      console.error(e)
    }
  })()
})

router.post('/', (req, res) => {
  const { name, unitPrice, unitsOnStock } = req.body as ProductType
  const newProduct = {
    name,
    unitPrice,
    unitsOnStock
  }
  const resultado = async (): Promise<string> =>
    await product.addProduct(newProduct)
  resultado()
    .then((prom) => res.send(prom))
    .catch((error) => res.send(error))
})

export default router
