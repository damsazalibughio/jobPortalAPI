const User = require('../models/User')
const jwt = require("jsonwebtoken");
// const  CustomAPIError  = require("../errors/customErrors");
const { UnauthenticatedError } = require("../errors");
  
const auth = async (req, res, next) =>{
    // check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token Provided')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // const {id, username} = decoded
        const user = User.findById(payload.id).select('-password')
        req.user = user
        req.user = {userId:payload.userId, name:payload.name}
        next()           
        } 
        catch (error) {
            throw new UnauthenticatedError('Not authorize to access this route')
        }
}


module.exports = auth