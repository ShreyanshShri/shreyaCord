import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Register = ({ registerUser }) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const onChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        registerUser(formData)
        setFormData({
            username: '',
            email: '',
            password: ''
        })
    }
    // eslint-disable-next-line
    return (
        <div className='container bg-discord'>
            <h2 className='mt-4'>Please Login Here...</h2>
            <form onSubmit={onSubmit} className='form-group mt-3'>
                <label>Enter Your Name</label>
                <input type='text' name='username' className='input' value={formData.username} onChange={onChange} className='form-control mb-2' required />
                <label>Enter Your Email</label>
                <input type='email' name='email' className='input' value={formData.email} onChange={onChange} className='form-control mb-2' required />
                <label>Set Your Password</label>
                <input type='password' name='password' className='input' value={formData.password} onChange={onChange} className='form-control mb-2' required />
                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link to='/login'><button className='btn btn-link'>Already have an acoount! Log In</button></Link>
            </form>
        </div>
    )
    // eslint-disable-next-line
}
export default Register;