import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = ({ registerUser, loading }) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [ip, setIp] = useState('')

    useEffect(() => {
        axios.get('https://api6.ipify.org?format=json')
        .then(res => {
            setIp(res.data.ip)
        })
    // eslint-disable-next-line
    }, [])

    const onChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        if(ip !== ''){
            registerUser({...formData, ip:ip})
            setFormData({
                username: '',
                email: '',
                password: ''
            })
        } else {
            alert('An error occured')
        }
        
    }
    
    return (
        <div className='container bg-discord'>
            {loading && <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
            </div>}
            <h2 className='mt-4'>Please Register Here...</h2>
            <form onSubmit={onSubmit} className='form-group mt-3'>
                <label>Enter Your Name</label>
                {/* eslint-disable-next-line */}
                <input type='text' name='username' className='input' value={formData.username} onChange={onChange} className='form-control mb-2' required />
                <label>Enter Your Email</label>
                {/* eslint-disable-next-line */}
                <input type='email' name='email' className='input' value={formData.email} onChange={onChange} className='form-control mb-2' required />
                <label>Set Your Password</label>
                {/* eslint-disable-next-line */}
                <input type='password' name='password' className='input' value={formData.password} onChange={onChange} className='form-control mb-2' required />
                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link to='/login'><button className='btn btn-link'>Already have an acoount! Log In</button></Link>
            </form>
        </div>
    )
}
export default Register;