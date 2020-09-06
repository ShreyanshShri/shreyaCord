import React from 'react'

import Message from './Message'

const Chats = ({messages}) => {
    const msgs = messages.map((message, index) => {
        return (
          <Message
            key = {index}
            username = {message.username}
            message = {message.message}
            time = {message.time}
          />
        );
    })
    
    return (
        <div>
            {msgs}
        </div>
    )
}

export default Chats
