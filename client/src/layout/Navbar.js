import React from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 

const Navbar = ({title, icon, switchNav, isSmall}) => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-purple h-10">
            <a className="navbar-brand" href="/">
                <i className='fa fa-discord' />
                <span style = {{fontSize:'130%'}} className='ml-2'>{title}</span>
            </a>
                {isSmall ? null : <button onClick={switchNav}>SwitchNav</button>}
            </nav>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    isSmall: PropTypes.bool.isRequired,
    switchNav: PropTypes.func
  }
  
  Navbar.defaultProps = {
    title: 'ChatCord',
    icon: 'fas fa-id-card-alt'
  }

export default Navbar
