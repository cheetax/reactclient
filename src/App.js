import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { CookiesProvider } from 'react-cookie'

class App extends Component {
  activateLasers = () => {
    console.log(window.location)
    this.win = window;
    this.win.location = 'http://localhost:3001/login';
    console.log(this.win.location)
    get
  }
  render() {
    return (
      <CookiesProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            LOGIN:
        </p>
          <button onClick={this.activateLasers.bind(this)}>
            Login
        </button>

        </div>
      </CookiesProvider>

    );
  }
}

export default App;
