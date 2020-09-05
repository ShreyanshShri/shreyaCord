import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 

const Navbar = ({title, icon}) => {
    return (
        <div>
            <div className='navbar bg-primary'>
            <h1>
            <Link to='/'>
                <i className={icon} /> {title}
            </Link>
            </h1>
            <ul>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </div>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
  }
  
  Navbar.defaultProps = {
    title: 'ChatCord',
    icon: 'fas fa-id-card-alt'
  }

export default Navbar
