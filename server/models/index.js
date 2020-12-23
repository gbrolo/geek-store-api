import dbConfig from '../config/db.config.js'
import mongoose from 'mongoose'
import products from './products/index.js'
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.products = products(mongoose)

export default db
