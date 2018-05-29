import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin } from './actions/login'
//import ListUsersPage from './view/ListUsersPage'
import TabsBarView from './view/TabsBarView'
import TabBarItem from './view/TabBarItem'
//import { Navbar, NavItem } from 'react-materialize'
import './App.css';
//import './materialize/css/materialize.css'

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

  componentDidMount() {
    //document.readyState
    //$('.button-collapse').sideNav(this.props.options);
  }

  btnLogin = () => {
    this.props.dispatch(setLogin())
  }

  getUsers = () => {
    this.props.dispatch(getUsers());
  }

  login = () => {
    if (!this.props.login) { return <TabBarItem right onClick={this.btnLogin.bind(this)} >Войти</TabBarItem> }
    else { return <TabBarItem right >Добро пожаловать</TabBarItem> }
  }

  render() {

    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div>
          <TabsBarView>
            <TabBarItem left onClick={this.getUsers} >Пользователи</TabBarItem>
            {this.login()}
          </TabsBarView>      
          {this.props.users.map(user => <div>{user.name}</div> )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
