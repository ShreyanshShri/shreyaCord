import React from 'react'

import Message from './Message'
import SendMsg from './SendMsg'

const Chats = ({messages, sendMsg, darkTheme}) => {
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

    let primaryTheme;
    if(darkTheme) {
        primaryTheme = 'dark-primary darkBorders'
    } else{
        primaryTheme = 'light bg-discord'
    }

    return (
        <div className={`col-sm-12 col-md-10 col-lg-9 bg-discord message-box ${primaryTheme}`}>
          <div className='messages'>
            {msgs}
          </div>
            <SendMsg sendMsg ={sendMsg} darkTheme={darkTheme} />
        </div>
    )
}

export default Chats
