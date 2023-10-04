const { populate } = require('dotenv')
const Message = require('../model/message')
const Chat = require('../model/chat')

async function sendMsg(req,res) {
    
    const content = req.body.message 
    const chatId = req.body.chatId 
    const sender =  req.body.sender //req.user._id 

    try {
        
        const newmsg = await Message.create(
            {
                sender: sender ,
                content: content ,
                chat: chatId
            }
        )

        const message = await Message.findById(newmsg._id).populate("sender", "name pimg").populate({path:"chat",populate: [ { path: "users", select: "-password"},{ path: "Admin", select: "-password"} ] })

        if(message) {

            await Chat.findByIdAndUpdate(chatId ,{
                lastMsg : message._id 
            })
            res.status(200).json(message)
        }
        else res.status(400).json({error:"wrong"})
        
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}


async function fetchMsg(req,res) {
    
    const chatId = req.params.id 

    try {
        
        const messages = await Message.find({ chat: chatId}).populate("sender", "name pimg").populate({path:"chat",populate: [ { path: "users", select: "-password"},{ path: "Admin", select: "-password"} ] })

        if(messages) res.status(200).json(messages)

        else  res.status(400).json({error: " not found"})

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}


module.exports = {sendMsg,fetchMsg}