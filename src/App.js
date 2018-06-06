import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin } from './actions/login'
import ListUsersPage from './view/ListUsersPage'
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

  constructor(props) {
    super(props)
    this.state = {
      contentView: null
    }
  }

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
    this.setState({contentView: 1})
    this.props.dispatch({
      type: 'GET_ROLES',
      payload: {},
    })
    this.props.dispatch(getUsers());
  }

  login = () => {
    if (!this.props.login) { return <TabBarItem right onClick={this.btnLogin.bind(this)} >Войти</TabBarItem> }
    else { return <TabBarItem right disabled>Добро пожаловать</TabBarItem> }
  }

  content = () => {
    switch (this.state.contentView) {
      case 1:
        return <ListUsersPage />
      default:
        return <div />
    }
  }

  render() {

    return (
      <div className='flex-page' >
        <header className="App-header">
          <h6>Тестовая модель клиента на React</h6>
        </header>
        <TabsBarView className='blue lighten-2' >
          <TabBarItem left onClick={this.getUsers} >Пользователи</TabBarItem>
          {this.login()}
        </TabsBarView>
        {this.content()}

      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
