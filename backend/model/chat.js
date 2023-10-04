const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

    title:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    messages:
        {
            ref:'Message',
            type:mongoose.Schema.Types.ObjectId
        }
    ,
    lastMsg:
        {
            ref:"Message",
            type:mongoose.Schema.Types.ObjectId,
            default:null
        },
    users:[
        {
            ref:'User',
            type:mongoose.Schema.Types.ObjectId
        }
    ],
    Admin:[
        {
            ref:'User',
            type:mongoose.Schema.Types.ObjectId
        }
    ],
   
},
{
    timestamps:true
})

module.exports = mongoose.model('Chat',chatSchema,'chat')