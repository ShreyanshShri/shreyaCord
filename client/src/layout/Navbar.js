import React,{useState, useEffect} from 'react'
import PropTypes from 'prop-types' 

const Navbar = ({title, switchNav, isSmall}) => {
    const [showBtn, setShowBtn] = useState(false)
    useEffect(() => {
        const url = window.location.href;
        if(url.includes("/chat")){
            setShowBtn(true)
        } else {
            setShowBtn(false)
        }
        // eslint-disable-next-line
    }, [])
    
    const btnStyle = {
        background:'none',
        border:'none',
        outline:'none',
        color:'white'
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-purple h-10">
            <a className="navbar-brand" href="/">
                <span style = {{fontSize:'130%'}} className='ml-2'>{title}</span>
            </a>
                {isSmall && showBtn ? <button onClick={switchNav} style={btnStyle} className='mr-2'><i className='fa fa-bars' /></button> : null}
            </nav>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    isSmall: PropTypes.bool.isRequired,
    switchNav: PropTypes.func
  }
  
  Navbar.defaultProps = {
    title: 'ShreyaCord'
  }

export default Navbar
