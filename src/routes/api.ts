import express from 'express'

import rolesRouter from './api/roles'
import usersRouter from './api/users'
import categoriesRouter from './api/categories'
import productsRouter from './api/products'

const router = express.Router()

router.use('/roles', rolesRouter)
router.use('/users', usersRouter)
router.use('/categories', categoriesRouter)
router.use('/products', productsRouter)

export default router
