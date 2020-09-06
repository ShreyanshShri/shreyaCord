import React from 'react'

const Message = ({username, message, time}) => {
    
    return (
        <div>
            <p>{username}</p>
            <p>{message}</p>
        </div>
    )
}

export default Message
