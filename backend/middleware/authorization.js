const jwt = require('jsonwebtoken')
const User = require('../model/users')

async function checkAuth(req,res,next) {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            // console.log(req.headers.authorization);
            token = req.headers.authorization.split(" ")[1]
            // console.log(token);
            const decoded = jwt.verify(token,'chatroom')

            req.user = await User.findById(decoded.id).select('password')

            next()
        } catch (error) {
            res.status(401).json({error:'not authorized'})
            return 
        }
    }

    if(!token){
        res.status(401).json({error:'not authorized, no token'})
    }
}

module.exports = checkAuth