import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

const AllMessages = ({oldMsgs, newMsgs}) => {
    return (
        <ScrollToBottom className='messages'>
            {oldMsgs}
            {newMsgs}
        </ScrollToBottom>
    )
}

export default AllMessages
