// const { CustomAPIError } = require("../errors");
const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) =>{

    let customError = {
        // setDefault
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message:err.message || 'Something went wrong try again'
    }

    // if(err instanceof CustomAPIError){
    //     console.log(err);
    //     return res.status(err.statusCode).json({message:err.message})
    // } 
    if(err.name ==='ValidationError'){
        customError.message = Object.values(err.errors).map((item) => item.message).join(', ')
        customError.statusCode = 400
    }
    if(err.code && err.code ===11000){
        customError.message = `Duplicate value enter for ${Object.keys(err.keyValue)} please choose another value`
        customError.statusCode = 400
    }
    if(err.name === 'CastError'){
        customError.message = `No Item found with id: ${err.value}`
        customError.statusCode = 404
    }
    return res
    .status(customError.statusCode).json({message: customError.message})
    // .status(StatusCodes.INTERNAL_SERVER_ERROR)
    // .json('Something went wrong check internet connection try again later')
}
module.exports = errorHandlerMiddleware




// const { CustomAPIError } = require("../errors");
// const {StatusCodes} = require('http-status-codes')
// const errorHandlerMiddleware = (err, req, res, next) =>{
//     if(err instanceof CustomAPIError){
//         console.log(err);
//         return res.status(err.statusCode).json({message:err.message})
//     } 
//     console.log(err);
//     return res
//     .status(StatusCodes.INTERNAL_SERVER_ERROR)
//     .json('Something went wrong check internet connection try again later')
// }
module.exports = errorHandlerMiddleware