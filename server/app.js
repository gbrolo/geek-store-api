import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import winston from 'winston'

import indexRouter from './routes/index'
import productsRouter from './routes/products'

import { handleError } from './handlers/error'
import { handleSuccess } from './handlers/success'

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

app.use(function (err, req, res, next) {
  handleError(err, req, res)
})

export default app
