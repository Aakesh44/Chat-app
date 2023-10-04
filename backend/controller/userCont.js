const User = require('../model/users')
const generateToken = require('../config/Generatejwt')

async function signIn(req,res) {
    
    try {
        

    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all the fields')
    }

    const userExist = await User.findOne({email:email})

    if(userExist){
        return res.status(400).json({ error: 'User already exists' });
    }

    const cuser = await User.create({
        name:name,
        email:email,
        password:password
    })

    const user = await User.findById(cuser._id).populate("friends", "-password")

    if(user){
        res.status(201).json(
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                title:user.title,
                bio:user.bio,
                pimg:user.pimg,
                cimg:user.cimg,
                friends:user.friends,
                token:generateToken(user._id)
            })
    }else{
        return res.status(400).json({ message: 'User not created' });
        
    }

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function logIn(req,res) {
    
    try {
        const {email,password} = req.body 

        const user = await User.findOne({email:email}).populate("friends", "-password")

        if(user && (await user.matchPassword(password))){
            res.status(201).json(
                {
                _id:user._id,
                name:user.name,
                email:user.email,
                title:user.title,
                bio:user.bio,
                pimg:user.pimg,
                cimg:user.cimg,
                friends:user.friends,
                token:generateToken(user._id)
            })
        }
        else{
            return res.status(400).json({ error: 'user not found' });
        }
    } 
    catch (error) {
        console.error( error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
}


async function edit(req,res) {

    const userId = req.body.userId 
    const newName = req.body.name
    const Newtitle = req.body.title
    const newBio = req.body.bio
    const newPimg = req.body.pimg
    const newCimg = req.body.cimg


    try {
        const user = await User.findById(userId)

        if(!user){
            res.status(400).json('user not found')
            return
        }

        const userEdit = await User.findByIdAndUpdate(
            userId,
            {
                $set:{
                     name : newName,
                     title : Newtitle,
                     bio : newBio,
                     pimg : newPimg,
                     cimg : newCimg,
                }
            },
            { new: true}
        )

        userEdit.modifiedCount === 0 ? res.status(400).json('not updated') : res.status(201).json({'details updated':userEdit})
    }catch (error) {
        console.error( error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
}


async function addToFriend(req,res) {
    
    const mainId = req.body.mainId 
    const userId = req.body.userId 

    try {
        const addFriend = await User.findByIdAndUpdate(
            mainId,
            { $addToSet: { friends: userId } },
            {new:true}
        ).populate("friends", "-password")
        
        // return res.status(200).json(addFriend)

        const isAdded =await addFriend.friends.some(friend=>friend._id.toString()===userId)
        if(isAdded){
            return res.status(200).json(addFriend)
        }
        else{
            return res.status(400).json({error:'not added to friend list'})
        }
        

    } catch (error) {
        res.status(500).json({error:err.message})
    }
}

async function removeFromFriend(req,res){
    const mainId = req.body.mainId 
    const userId = req.body.userId 

    try {
        const removeFriend = await User.findByIdAndUpdate(

            mainId,
            {
                $pull:{
                    friends:userId
                }
            },
            {new:true}
        ).populate("friends", "-password")
        
        const isRemoved = await removeFriend.friends.every(friend=> friend._id.toString() !== userId)
        if(isRemoved){
            return res.status(200).json(removeFriend)
        }
        else{
            return res.status(400).json('not remove from friend list')
        }
        
    } catch (error) {
        res.status(500).json({error:err.message})
    }
}
module.exports = {signIn,logIn,edit,addToFriend,removeFromFriend}