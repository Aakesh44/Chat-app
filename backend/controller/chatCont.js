const { populate } = require('dotenv');
const Chat = require('../model/chat')


async function getAndCreateChat(req,res) {

    try {
        const mainId = req.body.mainId
        const userId = req.body.userId 
        // console.log(req.user._id);
        const chat = await Chat.findOne({users:{$all: [mainId,userId] },isGroupChat:false}).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate({path: "users",select: "-password",populate: {  path: "friends",  select: "-password"}})

        if(chat){
            res.status(201).json(chat)
            return
        }
        else{
            const newChat = await Chat.create(
                {
                    title:'chat',
                    users:[mainId,userId],
                }
            )

            const sendChat = await Chat.findById(newChat?._id).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate({path: "users",select: "-password",populate: {  path: "friends",  select: "-password"}})
            // console.log(sendChat);
            res.status(201).json(sendChat)
        }
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function getGroupChat(req,res) {
    
    const chatId = req.params.id 
    try {
        const chat = await Chat.findById(chatId).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate("users" ,"-password").populate("Admin", "-password")

        if(chat){
            res.status(200).json(chat)
        }
        else{
            res.status(400).json({error:'nothing there'})
        }
        
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function getAllChats(req,res) {
    
    const userId = req.params.id

    try {
        const chats = await Chat.find({ users: {$in: [userId]} }).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate("users", "-password").sort({ updatedAt: -1 })

        if(chats){
            res.json(chats)
        }
        else{
            res.json('nothing there')
        }
        
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function createGroupChat(req,res) {

    const mainUser = req.body.mainUser
    const users= req.body.users 
    const title = req.body.title 

    if(!users || !title || users.length < 2){
        return res.status(400).json({error:"fill the all the fields"})
    }

    users.push(mainUser)

    try {
        
        const createChat = await Chat.create({
            users:users,
            title:title,
            isGroupChat:true,
            Admin:mainUser
        })

        const chat = await Chat.findById(createChat._id).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate("users", "-password").populate("Admin", "-password")
        res.status(200).json(chat)

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function renameChat(req,res) {

    const chatId = req.body.chatId 
    const chatName = req.body.chatName 

    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $set:{
                    title:chatName
                }
            },
            {
                new: true
            }
        ).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate("users", "-password").populate("Admin", "-password")

        if(chat){
            res.status(201).json(chat)
        }
        else{
            res.status(400).json('not modified')
        }

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function changeAdmin(req,res) {
    
    const chatId = req.body.chatId 
    const newAdmin = req.body.newAdmin
    const oldAdmin = req.body.oldAdmin 

    try {
        await Chat.findByIdAndUpdate(
            chatId,
            {
                $pullAll:{
                    Admin: [oldAdmin],
                    users: [oldAdmin]
                },           
            },
            {
                new: true
            })
        
        const chat =await Chat.findByIdAndUpdate(
            chatId,
            {
                $addToSet: {
                    Admin : newAdmin
                }
            },
            {
                new: true
            }
        ).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate("users", "-password").populate("Admin", "-password");

        if(chat){
            res.status(201).json(chat)
        }
        else{
            res.status(400).json('not modified')
        }
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}
async function addToGroupChat(req,res) {

    const chatId = req.body.chatId 
    const userIds = req.body.userIds
    try {
        
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $addToSet:{
                    users:{
                        $each: userIds
                    }
                }
            },
            { new : true}
        ).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate("users", "-password").populate("Admin", "-password")

        if(chat){
            res.status(201).json(chat)
        }
        else{
            res.status(400).json('not added')
        }
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}


async function removeFromGroupChat(req,res) {

    const chatId = req.body.chatId 
    const userIds = req.body.userIds
    try {
        
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pullAll:{
                    users:userIds
                }
            },
            { new : true}
        ).populate({path: "lastMsg", populate: { path: "sender", select: "name pimg"}}).populate("users", "-password").populate("Admin", "-password")

        if(chat){
            res.status(201).json(chat)
        }
        else{
            res.status(400).json('something wrong')
        }
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}


async function deleteGroup(req,res) {
    
    const chatId = req.params.id 

    try {
        
        const chat  = await Chat.findByIdAndDelete(chatId)

        if(chat){
            res.status(200).json({message:"deleted"})
        }
        else{
            res.status(400).json({error:"not deleted"})
        }

        
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}


async function  update (req,res) {
    
    await Chat.updateMany({},{ $set: { ["lastMsg"] : "651bacea94e1fdbb36611cf7" }} )
    
    .exec()
  .then(result => {
    console.log(`Updated ${result.nModified} documents`);
  })
  .catch(err => {
    console.error(err);
  })
}

module.exports = {getAndCreateChat,getGroupChat,getAllChats,createGroupChat,renameChat,changeAdmin,addToGroupChat,removeFromGroupChat,deleteGroup,update}