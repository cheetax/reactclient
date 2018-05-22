import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withCookies, Cookies } from 'react-cookie'
import cookie from 'react-cookie'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null
    }
  }

  componentWillMount() {
    const { cookies } = this.props;
    var id = cookies.get('id');
    this.setState({
      id: id || null
    });
  }

  componentDidUpdate() {
    const { cookies } = this.props;
    var login = cookies.get('login');

  }

  activateLasers = () => {
    console.log(window.location)
    this.win = window;
    this.win.location = 'http://localhost:3001/login';
    console.log(this.win.location)
  }

  getUser = () => {
    const { cookies } = this.props;
   
    fetch('http://localhost:3001/users',
      {
        method: 'POST',
        body: JSON.stringify({id: this.state.id}),
        //credentials: 'same-origin',
        withCredentials: true,
        headers: {
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      }).then(res => {
        console.log(res)
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
          LOGIN: {this.state.login}
        </p>
        <button onClick={this.activateLasers.bind(this)}>
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
