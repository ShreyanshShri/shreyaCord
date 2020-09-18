import React from 'react'

import Message from './Message'
import SendMsg from './SendMsg'
import AllMessages from './AllMessages'

const Chats = ({oldMessages, newMessages, sendMsg, darkTheme}) => {
  const oldMsgs = oldMessages.map((message, index) => {
    return (
      <Message
        key = {index}
        username = {message.username}
        message = {message.message}
        time = {message.time}
      />
    );
})
    const newMsgs = newMessages.map((message, index) => {
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
            <AllMessages oldMsgs={oldMsgs} newMsgs={newMsgs} />
            <SendMsg sendMsg ={sendMsg} darkTheme={darkTheme} />
        </div>
    )
}

export default Chats
