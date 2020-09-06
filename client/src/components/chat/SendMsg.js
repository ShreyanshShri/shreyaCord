import React, { useState } from 'react'

const SendMsg = ({ sendMsg }) => {
    const [msg, setMessage] = useState('')
    
    const onChange = event =>{
        setMessage(event.target.value)
    }
    const onSubmit = event => {
        event.preventDefault()
        sendMsg(msg)
        setMessage('')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' name='msg' onChange={onChange} value={msg} />
                <input type='submit' value='Send' />
            </form>
        </div>
    )
}

export default SendMsg
