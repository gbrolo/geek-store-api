import { StatusCodes } from 'http-status-codes'
import { ErrorHandler } from '../../handlers/error.js'
import { genProductKeywords, getPagination } from '../../helpers/utils.js'
import validateRequest from '../../helpers/validations/validator.js'
import productSchema from '../../helpers/validations/product.js'
import getProductSchema from '../../helpers/validations/getProduct.js'
import getProductsSchema from '../../helpers/validations/getProducts.js'
import updateProductSchema from '../../helpers/validations/updateProduct.js'
import db from '../../models/index.js'
import { SuccessResponseHandler } from '../../handlers/success.js'
const Product = db.products

export const createProduct = (req, res, next) => {
  validateRequest(req.body, productSchema, 'create product')
    .then(() => {
      const searchKeywords = genProductKeywords(req.body)
      const product = new Product({ ...req.body, searchKeywords })

      product
        .save(product)
        .then(data => {
          const succ = new SuccessResponseHandler(
            StatusCodes.OK,
            'Successfully created product',
            data
          )

          req.handleSuccess(succ, res)
        })
        .catch(error => {
          next(new ErrorHandler(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'CREATE_PRODUCT_ERROR',
            error.message || 'Unexpected error while creating product',
            'create product',
            error
          ))
        })
    })
    .catch(error => next(error))
}

export const getProducts = (req, res, next) => {
  validateRequest(req.query, getProductsSchema, 'get products')
    .then(() => {
      const { search, page, size } = req.query
      const condition = search ? { searchKeywords: { $regex: new RegExp(search), $options: 'i' } } : {}
      const { limit, offset } = getPagination(page, size)

      Product.paginate(condition, { offset, limit })
        .then(data => {
          const succ = new SuccessResponseHandler(
            StatusCodes.OK,
            'Successfully got products',
            {
              totalCount: data.totalDocs,
              products: data.docs,
              totalPages: data.totalPages,
              currentPage: data.page - 1
            },
            [
              {
                header: 'total-count',
                value: data.totalDocs
              },
              {
                header: 'X-Total-Count',
                value: data.totalDocs
              },
              {
                header: 'total-pages',
                value: data.totalPages
              }
            ]
          )

          req.handleSuccess(succ, res)
        })
        .catch(error => {
          next(new ErrorHandler(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'GET_PRODUCTS_ERROR',
            error.message || 'Unexpected error while fetching products',
            'get products',
            error
          ))
        })
    })
    .catch(error => next(error))
}

export const getProduct = (req, res, next) => {
  validateRequest(req.params, getProductSchema, 'get product')
    .then(() => {
      Product.findById(req.params.id)
        .then(data => {
          if (!data) {
            next(new ErrorHandler(
              StatusCodes.NOT_FOUND,
              'PRODUCT_NOT_FOUND_ERROR',
              `Could not find product with id ${req.params.id}`,
              'get product',
              `Could not find product with id ${req.params.id}`
            ))
          } else {
            const succ = new SuccessResponseHandler(
              StatusCodes.OK,
              'Successfully got product',
              data
            )

            req.handleSuccess(succ, res)
          }
        })
        .catch(error => {
          next(new ErrorHandler(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'GET_PRODUCTS_ERROR',
            error.message || 'Unexpected error while fetching products',
            'get products',
            error
          ))
        })
    })
    .catch(error => next(error))
}

export const updateProduct = (req, res, next) => {
  validateRequest({ ...req.params, ...req.body }, updateProductSchema, 'update product')
    .then(() => {
      const searchKeywords = genProductKeywords(req.body)
      const product = { ...req.body, searchKeywords }

      Product
        .findByIdAndUpdate(req.params.id, product, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            next(new ErrorHandler(
              StatusCodes.NOT_FOUND,
              'PRODUCT_NOT_FOUND_ERROR',
              `Could not find product with id ${req.params.id}`,
              'get product',
              `Could not find product with id ${req.params.id}`
            ))
          } else {
            const succ = new SuccessResponseHandler(
              StatusCodes.OK,
              'Successfully updated product',
              data
            )

            req.handleSuccess(succ, res)
          }
        })
        .catch(error => {
          next(new ErrorHandler(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'UPDATE_PRODUCT_ERROR',
            error.message || 'Unexpected error while updating product',
            'update product',
            error
          ))
        })
    })
    .catch(error => next(error))
}

export const deleteProduct = (req, res, next) => {
  validateRequest(req.params, getProductSchema, 'delete product')
    .then(() => {
      Product.findByIdAndRemove(req.params.id)
        .then(data => {
          if (!data) {
            next(new ErrorHandler(
              StatusCodes.NOT_FOUND,
              'PRODUCT_NOT_FOUND_ERROR',
              `Could not find product with id ${req.params.id}`,
              'get product',
              `Could not find product with id ${req.params.id}`
            ))
          } else {
            const succ = new SuccessResponseHandler(
              StatusCodes.OK,
              'Successfully deleted product',
              data
            )

            req.handleSuccess(succ, res)
          }
        })
        .catch(error => {
          next(new ErrorHandler(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'DELETE_PRODUCT_ERROR',
            error.message || 'Unexpected error while deleting product',
            'delete product',
            error
          ))
        })
    })
    .catch(error => next(error))
}

export const deleteProducts = (req, res, next) => {
  Product.deleteMany({})
    .then(data => {
      const succ = new SuccessResponseHandler(
        StatusCodes.OK,
        'Successfully deleted products',
        data
      )

      req.handleSuccess(succ, res)
    })
    .catch(error => {
      next(new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'DELETE_PRODUCTs_ERROR',
        error.message || 'Unexpected error while deleting all products',
        'delete products',
        error
      ))
    })
}
