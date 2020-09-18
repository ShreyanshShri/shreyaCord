import React from 'react'
import {Link} from 'react-router-dom'

const WelcomeUser = () => {
    
    return (
        <div className='welcome container d-flex justify-content-center align-items-center h-90'>
            <h3 style = {{color:'rgb(175, 36, 255)', background: 'rgba(0,0,0,0.01)', padding:'20px'}}>Welcome to ShreyaCord</h3>
            <h2 style = {{color:'rgb(175, 36, 255)', textAlign:'center'}}>Bored of Lockdown... Start Chatting With Your Friends</h2>
            <Link to='/login'><button className='btn btn-outline-primary mt-3'>Get Started</button></Link>
        </div>
    )
}

export default WelcomeUser
