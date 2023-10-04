const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        default:"title"
    },
    bio:{
        type:String,
        default:"bio"
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pimg:{
        type:String,
        default:"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais"
    },
    cimg:{
        type:String,
        default:"https://img.freepik.com/free-vector/hand-drawn-flat-winter-landscape-illustration_23-2149149134.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=sph"
    },
    friends:[
        {
            ref:"User",
            type:mongoose.Schema.Types.ObjectId
        }
    ],
    posts:[
        {
            ref:'Posts',
            type:mongoose.Schema.Types.ObjectId
        }
    ]
},
{
    timestamps:true
})

userSchema.methods.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

userSchema.pre('save',async function (next) {
    
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})



module.exports = mongoose.model('User',userSchema,'user')