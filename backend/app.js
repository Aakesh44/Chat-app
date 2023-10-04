const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const msgRoute = require('./router/msgRoutes')
const userRoute = require('./router/userRoutes')
const chatRoute = require('./router/chatRoutes')
const postRoute = require('./router/postRoutes')

const errorHandler = require('./middleware/error')


const status = 'Production'

dotenv.config()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

async function main() {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chat')
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
}
main()

app.use('/user',userRoute)
app.use('/chat',chatRoute)
app.use('/message',msgRoute)
app.use('/post',postRoute)

// ---------------------------------  DEPLOYMENT ---------------------------

const _dirname1 = path.resolve()
// const bb = require('../chatapp/build')

if(status === 'Production'){
    app.use(express.static(path.join(_dirname1,'../chatapp/build')))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(_dirname1, "chatapp", "build" ,"index.html"))
    })
}
else{
    app.get('/',(req,res)=>{res.send('server running on 5000')})
}

// ---------------------------------  DEPLOYMENT ---------------------------


app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT,()=>{console.log(`your app is running on ${PORT}`)})

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
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

    socket.off("setup", ()=>{
        console.log('user disconnected');
        socket.leave(userData._id)
    })
})
