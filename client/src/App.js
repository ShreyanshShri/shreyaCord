import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'

import Navbar from './layout/Navbar';
import Login from './components/user/Login'
import Register from './components/user/Register'
import ChatApp from './components/chat/ChatApp'


import './App.css';

function App() {

  const [redirect, setRedirect] = useState(false)
  const [hasAuth, setAuth] = useState(false)
  const [user, setUser] = useState({
    username: null,
    room: null
  })

  const currUser = async(formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    try {
      const res = await axios.post('/login', formData, config)
      console.log(res)
      if(res.status === 200) {
        setAuth(true)
        setUser({
          username: res.data.username,
          room: formData.room
        })
        setRedirect(true)
      } else {
        console.log('invalid credentials and plz add a alert for this')
      }
      
    } catch (err) {
      console.log('A server error')
    }
  }

  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/register', formData, config)
      console.log(res)
    } catch (err) {
      console.log('A server error')
    }
  }  

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/login' render={(props) => <Login {...props} redirect = { redirect } currUser = { currUser } />} />
          <Route exact path='/register' render={props => <Register {...props} registerUser = { registerUser }/> }/>
          <Route exact path='/chat' render= {props => <ChatApp {...props} hasAuth={hasAuth} user={user} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
