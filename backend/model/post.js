const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    title:{
        type:String,
        requied:true,
        trim:true
    },
    content:{
        type:String,
        requied:true,
        trim:true
    },
    owner:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId
    },
    likes:{
        type:Number,
        default:0
    },
    isSaved:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('Post',postSchema,'post')