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
        console.log('redirected')
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
          <Route exact path='/chat' component={ChatApp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
