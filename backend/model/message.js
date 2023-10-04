const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

    sender:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        ref:'Chat',
        type:mongoose.Schema.Types.ObjectId
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('Message',messageSchema,'message')