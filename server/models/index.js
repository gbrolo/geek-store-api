import dbConfig from '../config/db.config.js'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import products from './products/index.js'
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.products = products(mongoose, mongoosePaginate)

export default db
