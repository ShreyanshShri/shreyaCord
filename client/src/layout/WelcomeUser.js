import React from 'react'
import {Link} from 'react-router-dom'
// import background from '../images/discord-logo.png'

const WelcomeUser = () => {
    
    return (
        <div className='welcome container d-flex justify-content-center align-items-center h-90'>
            <h1 style = {{color:'rgb(60,60,255)', background: 'rgba(0,0,0,0.01)', padding:'20px'}}>Welcome User</h1>
            <Link to='/login'><button className='btn btn-outline-primary'>Get Started</button></Link>
        </div>
    )
}

export default WelcomeUser
