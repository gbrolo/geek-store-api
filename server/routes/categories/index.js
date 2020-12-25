import express from 'express'
import { getCategories } from '../../controllers/productCategories'
const router = express.Router()

router.get('/', getCategories)

export default router
