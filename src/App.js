import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import './App.css';

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
}

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

  btnLogin = () => {
    console.log(window.location)
    window.document.location = 'http://localhost:3001/login';
  }

  getUser = () => {
    this.props.dispatch(getUsers());
    // fetch('http://localhost:3001/users', {
    //   method: 'POST',
    //   credentials: 'include',
    //   //mode: 'no-cors',
    //   headers: {
    //     'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(res => res.json())
    //   .then(users => {
    //     console.log(users);
    //   })
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
        <div>
          {this.props.users.map(item => <p>{item.name}</p>)}
        </div>

      </div>

    );
  }
}

export default connect(mapStateToProps)(App);
//export default App;
