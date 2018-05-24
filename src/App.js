import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin } from './actions/login'
import './App.css';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    login: state.login
  };
}

class App extends Component {
  
  componentWillMount() {
    this.props.dispatch(getLogin())
  }

  btnLogin = () => {
    this.props.dispatch(setLogin())
  }

  getUser = () => {
    this.props.dispatch(getUsers());
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          LOGIN: {this.props.login}
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
