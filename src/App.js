import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  activateLasers = () => {
    //window.addEventListener()
    // window.addEventListener('message', function (event) {
    //   if (event.data.sender && event.data.sender === 'iframeName') {
    //     console.log(event.data.sender)
    //   }
    // })
    console.log(window.location)
    this.win = window;
    this.win.location = 'http://localhost:3001/users';
    console.log(this.win.location)
  }
  render() {
    return (
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
    );
  }
}

export default App;
