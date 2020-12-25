import { StatusCodes } from 'http-status-codes'
import { ErrorHandler } from '../../handlers/error.js'
import db from '../../models/index.js'
import { SuccessResponseHandler } from '../../handlers/success.js'
const ProductCategory = db.productCategories

export const getCategories = (req, res, next) => {
  ProductCategory.find({})
    .then(data => {
      const succ = new SuccessResponseHandler(
        StatusCodes.OK,
        'Successfully got categories',
        data
      )

      req.handleSuccess(succ, res)
    })
    .catch(error => {
      next(new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'GET_CATEGORIES_ERROR',
        error.message || 'Unexpected error while fetching categories',
        'get categories',
        error
      ))
    })
}
