const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customErrors')

class BedRequestError extends CustomAPIError{
    constructor(message){
        super(message)
       this.statusCode = StatusCodes.BAD_REQUEST
    }
}


module.exports = BedRequestError