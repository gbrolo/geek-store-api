import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import winston from 'winston'

import indexRouter from './routes/index'
import productsRouter from './routes/products'
import categoriesRouter from './routes/categories'

import { handleError } from './handlers/error'
import { handleSuccess } from './handlers/success'

import db from './models'

const app = express()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, DELETE, PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  next()
})

const errorLogger = new winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  exitOnError: false,
  transports: [
    new winston.transports.File({ filename: './errors.log' })
  ]
})

app.use(function (req, res, next) {
  req.errorLogger = errorLogger
  req.handleSuccess = handleSuccess
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', indexRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)

app.use(function (err, req, res, next) {
  handleError(err, req, res)
})

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('[server-init] Connected to MongoDB')
  })
  .catch(error => {
    console.log('[server-init] Connection to MongoDB failed')
    process.exit()
  })

export default app
