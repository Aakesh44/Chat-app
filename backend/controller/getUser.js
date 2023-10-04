const User = require('../model/users')

async function getAllUsers(req,res) {
    try {
        
        const users = await User.find()
        if(users){
            res.status(201).json({users:users})
            return
        }

        res.status(400).json('something went wrong')
    } 
    catch (error) {
        console.error( error);
        res.status(500).json({ errors: error });
}
}

async function getSingleUser(req,res){

    try {
        const user = await User.findById(req.params.id).populate("friends", "-password")
        if(!user){
            return res.status(400).json({error:'user doest exist'})
            
        }
        res.status(200).json(user)
    } 
    catch (error) {
        console.error( error);
        res.status(500).json({ error: error });
}
}

module.exports = {getAllUsers,getSingleUser}