import React from 'react'

const RoomInfo = ({currentRoom, roomUsers, navPos, switchTheme, darkTheme}) => {
    const roomUsersArr = roomUsers.map((user, index) => {
        return(
            <li key={index} className={`list-group-item`}>{user.username}</li>
        )
    })

    if(currentRoom === 'kabuttargang'){
        currentRoom = 'Kabuttar Gang'
    } else if (currentRoom === 'soloindia') {
        currentRoom = 'SoloIndia'
    } else if (currentRoom === 'solofamily') {
        currentRoom = 'SoloFamily'
    } else {
        currentRoom='Fetching Data'
    }

    let pos, primaryTheme;
    if(navPos) {
        pos = 'translate-positive'
    } else {
        pos = 'translate-negative'
    }
    if(darkTheme) {
        primaryTheme = 'dark-primary darkBorders'
    } else{
        primaryTheme = 'light'
    }

    return (
        <div className={`sidebar col-md-2 col-lg-3 ${pos} ${primaryTheme} container d-flex flex-column justify-content-center`}>
            <h2 className='purple-text'>{currentRoom}</h2>
            <a href='/' className='btn btn-outline-primary d-inline mt-4'>Leave Room</a>
            <input type="checkbox" className="custom-control-input" id="switchTheme" onChange={switchTheme} />
            <label className="custom-control-label ml-4 mb-3" for="switchTheme">Dark Theme</label>
            <span className='mt-3' style={{fontSize:'18px'}}>Users Online : {roomUsers.length}</span>
            <ul className='list-group'>
                {roomUsersArr}
            </ul>
        </div>
    )
}

export default RoomInfo
