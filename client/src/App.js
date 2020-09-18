import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'

import Navbar from './layout/Navbar';
import Login from './components/user/Login'
import Register from './components/user/Register'
import ChatApp from './components/chat/ChatApp'
import WelcomeUser from './layout/WelcomeUser'

import './App.css';

function App() {
  // creating component level state
  const [redirect, setRedirect] = useState(false)
  const [hasAuth, setAuth] = useState(false)
  const [user, setUser] = useState({
    username: null,
    room: null
  })
  const [loading, setLoading] = useState(false)

  // checking if user is using a phone or pc
  let isSmall;
    if(window.innerWidth >= 768) {
        isSmall = true;
    } else {
        isSmall = false
    }
    const [navPos, setNavPos] = useState(isSmall)

    // user login
  const currUser = async(formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    try {
      setLoading(true)
      const res = await axios.post('/login', formData, config)
      setLoading(false)
      if(res.status === 200) {
        setAuth(true)
        setUser({
          username: res.data.username,
          room: formData.room
        })
        setLoading(true)
        setRedirect(true)
      }
    } catch (err) {
      setLoading(false)
      swal({
        title: "Error !",
        text: 'Invalid Credentials',
        icon: "error",
        button: "Try Again",
      })
    }
  }

  // registering user
  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      setLoading(true)
      const res = await axios.post('/register', formData, config)
      if(res.status === 200){
        setLoading(false)
        swal({
          title: "Success!",
          text: 'Registered Successfully... Login to continue',
          icon: "success",
          button: "OK",
        })
      }
    } catch (err) {
      setLoading(false)
      swal({
        title: "Error !",
        text: 'User Already Exists',
        icon: "error",
        button: "Try Again",
      })
    }
  }

  const switchNav = (e) => {
    e.preventDefault()
    setNavPos(prevPos => !prevPos)
}

  return (
    <div className="App" style = {{height: '100vh'}}>
      <Router>
        <Navbar switchNav={switchNav} isSmall={isSmall} />
        <Switch>
          <Route exact path='/' component={WelcomeUser} />
          <Route exact path='/login' render={(props) => <Login {...props} loading = {loading} redirect = { redirect } currUser = { currUser } />} />
          <Route exact path='/register' render={props => <Register {...props} loading = {loading} registerUser = { registerUser }/> }/>
          <Route exact path='/chat' render= {props => <ChatApp {...props} hasAuth={hasAuth} user={user} />} navPos={navPos} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
