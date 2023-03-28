import express from 'express'
import morgan from 'morgan'

import { PORT } from './config'
import { synchronizeTables } from './database/table-sync'
import apiRouter from './routes/api'

void synchronizeTables()

// App Declaration
const app = express()

// Settings
app.set('port', PORT !== '' ? PORT : 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json()) // middleware que transforma la req.body a un json

// Routes
app.use('/', apiRouter)

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
// chuleta ALT + 96 ``
