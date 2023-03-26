import express from 'express'

import * as categories from '../../controllers/categories'

const router = express.Router()

router.get('/', (_req, res) => {
  void (async () => {
    await categories.getCategories(res)
  })()
})

router.get('/:id', (req, res) => {
  void (async () => {
    await categories.getCategoryById(req, res)
  })()
})

router.post('/', (req, res) => {
  void (async () => {
    await categories.createCategory(req, res)
  })()
})

router.delete('/:id', (req, res) => {
  void (async () => {
    await categories.deleteCategory(req, res)
  })()
})

router.patch('/:id', (req, res) => {
  void (async () => {
    await categories.updateCategory(req, res)
  })()
})

export default router
