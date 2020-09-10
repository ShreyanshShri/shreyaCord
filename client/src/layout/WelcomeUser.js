import React from 'react'
import {Link} from 'react-router-dom'

const WelcomeUser = () => {
    return (
        <div>
            <h1>Welcome User</h1>
            <Link to='/login'>Get Started</Link>
        </div>
    )
}

export default WelcomeUser
