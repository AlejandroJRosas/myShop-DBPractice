import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('users')
})

router.post('/', (req, res) => {
  // const {  }
  res.send(req.body)
})

export default router
