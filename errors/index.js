const CustomAPIError = require("./customErrors");
const BadRequestError = require("./badRequest");
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./notFound')

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError
}