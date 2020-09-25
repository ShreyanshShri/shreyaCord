import React, { useState, useEffect, Fragment } from 'react'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'

import RoomInfo from './RoomInfo'
import Chats from './Chats'
import ding from '../../sounds/ding-sound-effect_2.mp3'

let socket

const ChatApp = ({hasAuth, user, navPos}) => {
    const {username, room} = user;
    const [oldMessages, setMsg] = useState([])
    const [newMessages, addMsg] = useState([])
    const [currentRoom, setRoom] = useState(null)
    const [darkTheme, setDarkTheme] = useState(false)
    const [roomUsers, setRoomUsers] = useState([])
    
    const audio = new Audio(ding)
    

    socket = io('http://localhost:5000')


    // joining the user
    useEffect(() => {
        if(hasAuth) {
            socket.emit('joinRoom', { username, room })
        }
        // eslint-disable-next-line
    }, [])

    // handling messages
    socket.on('message', (message) => {
        if(Array.isArray(message)){
                setMsg(message)
        } else {
            addMsg(prevMessages => [...prevMessages, message ])
            if(message.username !== username){
                audio.play()
            }
        }
    })
    // fetching room users info
    socket.on('roomUsers', ({room, users}) => {
        setRoom(room)
        setRoomUsers(users)
    })
    // sending a message
    const sendMsg = (message) => {
        const msg = {
            message,
            username,
            room
        }
        if(message !== ''){
            socket.emit('sendMessage', msg)
        }
    }
    // switching b/w dark theme and light theme
    const switchTheme = () => {
        setDarkTheme(prevVal => !prevVal)
    }

    let primaryTheme;
    if(darkTheme) {
        primaryTheme = 'dark-primary'
    } else{
        primaryTheme = 'light'
    }

    // checking if user has auth or not
    if(hasAuth){
        return (
            <Fragment>
                <div className={`container-less height-9 ${primaryTheme}`}>
                <div className='row'>
                    <RoomInfo currentRoom={currentRoom} roomUsers={roomUsers} navPos = {navPos} darkTheme={darkTheme} switchTheme={switchTheme}/>
                    <Chats oldMessages = {oldMessages} newMessages = {newMessages} sendMsg ={sendMsg} darkTheme={darkTheme} />
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
