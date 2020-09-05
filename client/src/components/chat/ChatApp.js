import React from 'react'
import io from 'socket.io-client'

import RoomInfo from './RoomInfo'
import Chats from './Chats'
import SendMsg from './SendMsg'

let socket

const ChatApp = () => {
    socket = io('http://localhost:5000')
    
    const sendMsg = (message) => {
        const msg = {
            message,
            username: 'Shreyansh'
        }
        socket.emit('sendMessage', msg)
    }
    
    return (
        <div>
            <RoomInfo />
            <Chats />
            <SendMsg sendMsg ={() => sendMsg()} />
        </div>
    )
}

export default ChatApp
