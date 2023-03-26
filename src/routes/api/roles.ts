import express from 'express'

import * as roles from '../../controllers/roles'

const router = express.Router()

router.get('/', (_req, res) => {
  void (async () => {
    await roles.getRoles(res)
  })()
})

router.get('/:id', (req, res) => {
  void (async () => {
    await roles.getRoleById(req, res)
  })()
})

router.post('/', (req, res) => {
  void (async () => {
    await roles.createRole(req, res)
  })()
})

router.delete('/:id', (req, res) => {
  void (async () => {
    await roles.deleteRole(req, res)
  })()
})

router.patch('/:id', (req, res) => {
  void (async () => {
    await roles.updateRole(req, res)
  })()
})

export default router
