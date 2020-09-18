import React, {useState} from 'react'
import {Redirect, Link} from 'react-router-dom'

const Login = ({currUser, redirect, loading}) => {
    const [user, setUser] = useState({
        email:'',
        password:'',
        room:'solofamily'
    })
    const onChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        currUser(user)
        setUser({
            email:'',
            password:'',
            room:'solofamily'
        })
    }

    return (
        <div className='container bg-discord'>
            {loading && <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
            </div>}
            <h2 className='mt-4'>Please Login Here...</h2>
            <form onSubmit={onSubmit} className='form-group mt-3'>
                <label>Enter your Email</label>
                <input type='text' name='email' value={user.email} onChange={onChange} className='form-control mb-3' />
                <label>Enter your password</label>
                <input type='password' name='password' value={user.password} onChange={onChange} className='form-control mb-3' />
                <label>Select your room</label>
                <select value={user.room} onChange={onChange} name='room' className="btn btn-secondary ml-3">
                    <option className='dropdown-item' value="solofamily">SoloFamily [English]</option>
                    <option className='dropdown-item' selected value="soloindia">SoloIndia [Hindi]</option>
                    <option className='dropdown-item' value="kabuttargang">Kabuttar gang</option>
                </select>
                <br /><br />
                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link to='/register'><button className='btn btn-link'>Or create a new Account</button></Link>
            </form>
            {redirect && <Redirect to={`/chat`} />}
        </div>
    )
}

export default Login
