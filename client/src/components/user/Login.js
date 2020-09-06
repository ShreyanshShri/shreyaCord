import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

const Login = ({currUser, redirect}) => {
    const [user, setUser] = useState({
        email:'',
        password:'',
        room:''
    })
    const onChange = event => {
        setUser({
            ...user,
            [event.target.placeholder]: event.target.value,
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        console.log(user)
        currUser(user)
        // setUser({
        //     email:'',
        //     password:'',
        //     room:''
        // })
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder='email' value={user.email} onChange={onChange} />
                <input type='text' placeholder='password' value={user.password} onChange={onChange} />
                <input type='text' placeholder='room' value={user.room} onChange={onChange} />
                <button typoe='submit'>Submit</button>
            </form>
            {redirect && <Redirect to={`/chat`} />}
        </div>
    )
}

export default Login
