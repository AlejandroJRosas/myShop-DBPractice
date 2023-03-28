import express from 'express'

import {
  getRoles,
  getRoleById,
  addRole,
  deleteRole,
  updateRole
} from '../../controllers/roles.controller'

const router = express.Router() 

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getRoles)
router.get('/:roleId', getRoleById)
router.post('/', addRole)
router.delete('/:roleId', deleteRole)
router.put('/:roleId', updateRole)

export default router
