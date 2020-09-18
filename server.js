require('dotenv').config()
const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const app = express()
const moment = require('moment')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const emailExistence = require('email-existence')
const Message = require('./models/Message')
const User = require('./models/User')


const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost/chatApp'

mongoose.connect(mongodbUrl,
{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true },()=>{
    console.log("Successfully Connected to Database")
})

const server = http.createServer(app)
const io = socketio(server)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
        // io.to(user.room).emit('notify', 'Welcome to chatCord!')
        // notifying everyone
        // socket.to(user.room).emit('notify', `${user.username} joined the chat`);
        socket.to(user.room).emit('message', {
            message: `${user.username} Joined The Chat`,
            username: 'Shreya-Bot',
            time: moment().format('h:mm a')
        })

        socket.emit('user-info', socket.id)

        // fetching data from db
        const oldMsgs = await Message.find({room : user.room})
        // sending old msgs from db (will run only once and will be sent to new user only)
        socket.emit('message', oldMsgs)
        
        // sending room info
        const roomUsers = users.filter(u => {
            return user.room == u.room
        })
        
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: roomUsers
        });
    })

    // sending a message
    socket.on('sendMessage', async ({message, username, room}) =>{
        const time = moment().format('h:mm a')
        io.to(room).emit('message', {message, username, time})
        
        // saving it to db
        const msg = new Message({
            message,
            username,
            time,
            room
        })
        try {
            await msg.save()
        } catch (err) {
            console.log(err.message)
        }
    })

    // user disconnects (closes the tab)
    socket.on('disconnect', () => {
        const index = users.findIndex(user => {
            return user.id === socket.id
        })

        if(index !== -1) {
            const user = users.splice(index, 1)[0]

            if(user){
                // sending room info
                const roomUsers = users.filter(u => {
                    return user.room == u.room
                })
                
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: roomUsers
                });
                io.to(user.room).emit('message', {
                    message: `${user.username} Left The Chat`,
                    username: 'Shreya-Bot',
                    time: moment().format('h:mm a')
                })
            }
        }
    })
})

app.post('/register', async(req, res) => {
    const {username, email, password, ip} = req.body
    const encryptedPass = await bcrypt.hash(password, 10)

    const emailExists = await emailExistence.check(email)
    const userExists = await User.findOne({ email : email })

    if(!emailExists) return res.status(400).json({message: 'Plz enter a valid email'})
    if(userExists) return res.status(400).json({message: 'User Already exists'})
    
    const user = new User({
        username,
        email,
        password: encryptedPass,
        ip
    })

    try {
        await user.save()
        res.status(200).json({message: 'Succesfully Registered... Login to continue'})
    } catch (err) {
        return res.json({message: 'Server side error'})
    }
})

app.post('/login', async(req, res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({ email: email })

    if(!user) return res.status(400).json({message: 'User doesnt exists'})

        const check = await bcrypt.compare(password, user.password)
            if(check) {
                res.status(200).json(user)
            } else {
                return res.status(400).json({message: 'Invalid Credientials'})
            }

})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// https://github.com/adrianhajdin/project_chat_application
// https://github.com/bradtraversy/contact-keeper
// https://cloud.mongodb.com/v2/5f61da4489dd402521c7c94d#clusters

/*
    todos-
    * create the front end UI
    * convert html to react
    * make user login using passport
*/