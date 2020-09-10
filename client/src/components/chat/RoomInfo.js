import React from 'react'

const RoomInfo = ({currentRoom, roomUsers}) => {
    // console.log(currentRoom, roomUsers)
    const roomUsersArr = roomUsers.map((user, index) => {
        return(
            <li key={index}>{user.username}</li>
        )
    })

    return (
        <div>
            <h2>{currentRoom} {  } {roomUsers.length}</h2>
            <ul>
                {roomUsersArr}
            </ul>
        </div>
    )
}

export default RoomInfo
