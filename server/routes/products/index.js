import express from 'express'
import { createProduct, deleteProduct, deleteProducts, getProduct, getProducts, getProductsWithCondition, updateProduct } from '../../controllers/products'
const router = express.Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.post('/advanced', getProductsWithCondition)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.delete('/', deleteProducts)

export default router
