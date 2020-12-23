import { ErrorHandler } from '../../handlers/error'
import { StatusCodes } from 'http-status-codes'

export default (object, schema, location) => {
  return new Promise((resolve, reject) => {
    const errors = schema.validate(object)

    if (errors.length === 0) {
      resolve()
    } else {
      const errorsMessages = errors.reduce((message, error) => {
        message += `${error.message}, `
        return message
      }, '')

      reject(new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        'INVALID_REQUEST_BODY',
        errorsMessages,
        location,
        errorsMessages
      ))
    }
  })
}
