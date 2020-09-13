import React from 'react'

const Message = ({username, message, time}) => {
    
    return (
        <div className='message container my-2'>
            <p><span className='left purple-text'>{username}</span><span className='right text-muted'>{time}</span></p><br />
            <p className='m-7'>{message}</p>
        </div>
    )
}

export default Message
