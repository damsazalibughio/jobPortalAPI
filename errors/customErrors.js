
class CustomAPIError extends Error {
    constructor(message) {
      super(message)
    }
  }
  
  module.exports = CustomAPIError


  // starter
  // class CustomAPIError extends Error {
  //   constructor(message, statusCode) {
  //     super(message)
  //     this.statusCode = statusCode
  //   }
  // }
  
  // module.exports = CustomAPIError
  
  