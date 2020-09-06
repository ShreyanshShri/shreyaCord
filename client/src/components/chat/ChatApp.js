import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

import RoomInfo from './RoomInfo'
import Chats from './Chats'
import SendMsg from './SendMsg'

let socket

const ChatApp = ({hasAuth, user}) => {
    const {username, room} = user;
    const [messages, addMsg] = useState([])
    socket = io('http://localhost:5000')
    
    // joining the user
    useEffect(() => {
        if(hasAuth) {
            socket.emit('joinRoom', { username, room })
        }
        // eslint-disable-next-line
    }, [user])

    socket.on('message', (message) => {
        if(Array.isArray(message)){
                addMsg(message)
        } else {
            addMsg(prevMessages => [...prevMessages, message ])
        }
    })

    const sendMsg = (message) => {
        const msg = {
            message,
            username,
            room
        }
        socket.emit('sendMessage', msg)
    }
    if(hasAuth){
        return (
            <div>
                <RoomInfo />
                <Chats messages = {messages} />
                <SendMsg sendMsg ={sendMsg} />
            </div>
        )
    } else {
        return (
            <h1>Login to continue...</h1>
        )
    }
    
}

export default ChatApp
