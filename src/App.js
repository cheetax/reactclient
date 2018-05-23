import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withCookies, Cookies } from 'react-cookie'
//import axios from 'axios';
import cookie from 'react-cookie'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusLogin: null
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/login',
      {
        method: 'POST',
        credentials: 'include',
        //mode: 'no-cors',
        
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(data => {
        console.log(data)
        this.setState({
          statusLogin: data.status || null
        })
      })
  }

  componentDidUpdate() {
    const { cookies } = this.props;
    var login = cookies.get('login');

  }

  btnLogin = () => {
    console.log(window.location)
    //this.win = window;
    window.document.location = 'http://localhost:3001/login';
    //console.log(this.win.location)
  }

  getUser = () => {

    fetch('http://localhost:3001/users',
      {
        method: 'POST',
        credentials: 'include',
        //mode: 'no-cors',
        headers: {
          'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(users => {
        console.log(users)
      })

  }



  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          LOGIN: {this.state.statusLogin}
        </p>
        <button onClick={this.btnLogin.bind(this)}>
          Login
        </button>
        <button onClick={this.getUser.bind(this)}>
          Get Users
        </button>
      </div>

    );
  }
}

export default withCookies(App);
