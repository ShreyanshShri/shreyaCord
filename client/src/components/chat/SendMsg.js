import React, { useState } from 'react'

const SendMsg = ({ sendMsg, darkTheme }) => {
    const [msg, setMessage] = useState('')
    
    const onChange = event =>{
        setMessage(event.target.value)
    }
    const onSubmit = event => {
        event.preventDefault()
        sendMsg(msg)
        setMessage('')
    }
    let primaryTheme;
    if(darkTheme) {
        primaryTheme = 'white-text'
    } else{
        primaryTheme = 'dark-text'
    }
    return (
        <div>
            <form onSubmit={onSubmit} className='sendMsg mt-1'>
                <input type='text' name='msg' placeholder='Enter Your Message...' className={`inp width-9 ${primaryTheme}`} onChange={onChange} value={msg} />
                <button type='submit' className='btn-outline-primary ml-2 sendBtn' style={{border:'none', outline:'none', padding:'5px'}}><i className='fa fa-paper-plane fa-2x' /></button>
            </form>
        </div>
    )
}

export default SendMsg
