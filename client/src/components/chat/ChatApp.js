import React, { useState, useEffect, Fragment } from 'react'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'

import RoomInfo from './RoomInfo'
import Chats from './Chats'

let socket

const ChatApp = ({hasAuth, user, navPos}) => {
    const {username, room} = user;
    const [messages, addMsg] = useState([])
    const [currentRoom, setRoom] = useState(null)
    const [darkTheme, setDarkTheme] = useState(false)
    const [roomUsers, setRoomUsers] = useState([])
    

    socket = io('http://localhost:5000')


    // joining the user
    useEffect(() => {
        if(hasAuth) {
            socket.emit('joinRoom', { username, room })
        }
        // eslint-disable-next-line
    }, [])

    socket.on('message', (message) => {
        if(Array.isArray(message)){
                addMsg(message)
        } else {
            addMsg(prevMessages => [...prevMessages, message ])
        }
    })

    socket.on('roomUsers', ({room, users}) => {
        // console.log('got room info')
        // console.log(room, users)
        console.log('triggerd')
        console.log(users)
        setRoom(room)
        setRoomUsers(users)
    })

    const sendMsg = (message) => {
        const msg = {
            message,
            username,
            room
        }
        socket.emit('sendMessage', msg)
    }

    const switchTheme = () => {
        setDarkTheme(prevVal => !prevVal)
        console.log(darkTheme)
    }

    let primaryTheme;
    if(darkTheme) {
        primaryTheme = 'dark-primary'
    } else{
        primaryTheme = 'light'
    }


    if(hasAuth){
        return (
            <Fragment>
                {/* <button className='btn btn-outline-success' onClick={switchNav}>Switch</button>     */}
                <div className={`container-less height-9 ${primaryTheme}`}>
                <div className='row'>
                    {/* <a href = '/'>Leave Room</a> */}
                    <RoomInfo currentRoom={currentRoom} roomUsers={roomUsers} navPos = {navPos} darkTheme={darkTheme} switchTheme={switchTheme}/>
                    <Chats messages = {messages} sendMsg ={sendMsg} darkTheme={darkTheme} />
                </div>
                </div>
            </Fragment>
        )
    } else {
        return (
            <h1><Link to='/login' >Login</Link> to continue...</h1>
        )
    }
    
}

export default ChatApp
