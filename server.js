const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const app = express()
const moment = require('moment')
const mongoose = require('mongoose')
const Message = require('./models/Message')


mongoose.connect("mongodb://localhost/chatApp",
{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true },()=>{
    console.log("Successfully Connected to DataBase")
})

const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('./public'))

var users = []

io.on('connection', socket => {
    // joining user to a room when it connects to server
    socket.on('joinRoom', async ({ username, room }) => {
        // creating and connecting a user
        const user = {
            id: socket.id,
            username,
            room
        }
        users.push(user)
        socket.join(user.room)
        // welcoming
        io.to(user.room).emit('notify', 'Welcome to chatCord!')
        // notifying everyone
        socket.to(user.room).emit('notify', `${user.username} joined the chat`);

        // fetching data from db
        const oldMsgs = await Message.find({room : user.room})
        // sending old msgs from db (will run only once and will be sent to new user only)
        socket.emit('message', oldMsgs)

        // sending a message
        socket.on('sendMessage', async ({message, username}) =>{
            const time = moment().format('h:mm a')
            io.to(user.room).emit('message', {message, username, time})

            // saving it to db
            const msg = new Message({
                message,
                username,
                time,
                room:user.room
            })
            try {
                await msg.save()
            } catch (err) {
                console.log(err.message)
            }
        })

        // sending room info
        const roomUsers = users.filter(u => {
            return user.room == u.room
        })

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: roomUsers
          });
    })


    // user disconnects
    socket.on('disconnect', () => {
        let userLeft;
        users = users.filter(user => {
            if(user.id == socket.id) userLeft = user
            return user.id != socket.id;
        })
        // console.log(users)
        // socket.emit(`${userLeft.username} left the Chat.`)
        socket.emit('A user Left')
    })
})

app.get('/test', (req, res) => {
    res.json({working: 'true'})
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// https://github.com/adrianhajdin/project_chat_application
// https://github.com/bradtraversy/contact-keeper

/*
    todos-
    * create the front end UI
    * convert html to react
    * make user login using passport
*/