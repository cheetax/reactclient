import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin } from './actions/login'
import ListUsersPage from './view/ListUsersPage'
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

  login = () => {
    if (!this.props.login) { return <button onClick={this.btnLogin.bind(this)}>Login</button>; }
    else { return <div >Добро пожаловать</div> }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className='flex-container' >
          <div className='flex-menu'>
            <div className='flex-item' >
              <button onClick={this.getUser}>
                Пользователи
              </button>
            </div>
            <div className='raw-item' >
              {this.login()}
            </div>
            <div className='' >
              <ListUsersPage />
            </div>
          </div>
        </div>



      </div>

    );
  }
}

export default connect(mapStateToProps)(App);
