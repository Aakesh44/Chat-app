const express = require('express')
const app = express()
const socketIo = require('socket.io')

const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const msgRoute = require('./router/msgRoutes')
const userRoute = require('./router/userRoutes')
const chatRoute = require('./router/chatRoutes')
const postRoute = require('./router/postRoutes')

const errorHandler = require('./middleware/error')

dotenv.config()


app.use(cors(
    {
        origin:"https://chatly-rho.vercel.app",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,                
    }
));


app.use(express.urlencoded({extended:true}))
app.use(express.json())

async function main() {

    try {
        let local ='mongodb://127.0.0.1:27017/chat'
        const AtlasDBurl = "mongodb+srv://aakeshviswanathan:rYLhmi73gzrwKCwp@cluster0.hrurtma.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(AtlasDBurl,{useNewUrlParser: true,useUnifiedTopology: true})
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
}
main()

app.get('/',(req,res)=>{res.send('server running on vercel')})

app.use('/user',userRoute)
app.use('/chat',chatRoute)
app.use('/message',msgRoute)
app.use('/post',postRoute)

app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT,()=>{console.log(`your app is running on ${PORT}`)})

const io = socketIo(server,{
    pingTimeout: 6000,
    cors: {
        "Access-Control-Allow-Origin": "*",
        origin: "https://chatly-rho.vercel.app",
        methods: ['GET','POST'],
        credentials: true
    }
})


io.on("connection", (socket) => {

    console.log(" connection to socket.io ");

    socket.on('setup', (userData) => {
        socket.join(userData._id)
        // console.log(userData?._id,userData?.name);
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        // console.log("user joined room: " + room);
    })

    socket.on('typing', (room) => socket.in(room).emit("typing"))   
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))


    socket.on('new message', (newMessageRecieved)=>{

        // console.log('message received');

        const chat = newMessageRecieved.chat 

        if(!chat.users) return console.log('chat users not defined');

        chat.users.forEach(user =>{
            if(user._id === newMessageRecieved.sender._id) return

            socket.in(user._id).emit("message received", newMessageRecieved)

            // console.log(' new chat 🪄');
        })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

})



    // socket.off("setup", (userData)=>{
    //     console.log('user disconnected');
    //     socket.leave(userData._id)
    // })

// (server,{
//     pingTimeout: 60000,
//     cors: {
//         origin:'*',
//     }
// })