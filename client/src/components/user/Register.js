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

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' name='username' placeholder='Name' className='input' value={formData.username} onChange={onChange} required />
                <input type='email' name='email' placeholder='Email' className='input' value={formData.email} onChange={onChange} required />
                <input type='password' name='password' placeholder='Password' className='input' value={formData.password} onChange={onChange} required />
                <button typoe='submit'>Submit</button>
            </form>
            <Link to='/login'>Already have an acoount! Log In</Link>
        </div>
    )
}
export default Register;