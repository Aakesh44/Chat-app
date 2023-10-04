const jwt = require('jsonwebtoken')
const secrectKey = 'chatroom'

const generateToken = (id) =>{

    return jwt.sign({id},secrectKey,{expiresIn:'30d'})
}

module.exports = generateToken