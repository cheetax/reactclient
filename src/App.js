import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin } from './actions/login'
import ListUsersPage from './view/ListUsersPage'
import TabsBarView from './view/TabsBarView'
import TabBarItem from './view/TabBarItem'
import LoginPage from './view/LoginPage'
//import { Navbar, NavItem } from 'react-materialize'
import './App.css';
//import './materialize/css/materialize.css'

const mapStateToProps = (state) => {
  return {
    users: state.users,
    login: state.login,
    contentView: state.contentView,
  };
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
    this.onSelectedItem = this.onSelectedItem.bind(this);
    //this.getTabBarItem = this.getTabBarItem.bind(this)
  }

  componentDidMount() {
    if (!document.cookie) this.props.dispatch(setLogin())
    else this.props.dispatch(getLogin());
  }

  btnLogin = () => {
    this.props.dispatch({ type: 'NEW_PAGE', payload: -1 })
    //this.props.dispatch(setLogin())
  }

  getUsers = () => {
    //this.setState({contentView: 1})

  }

  onSelectedItem = (index) => {

    if (this.props.login.status) this.props.dispatch({ type: 'NEW_PAGE', payload: index })
  }

  getTabBarItem = () => {
//    console.log('getTabBarItem')
    var elements = [];
    if (this.props.login.user.roles.includes('administrator')) {
      elements.push(<TabBarItem left >Пользователи</TabBarItem>)

    }
    if (this.props.login.user.roles.includes('customer')) {
      elements.push(<TabBarItem left  >Заявки</TabBarItem>)
    }
    elements.push(<TabBarItem right>Добро пожаловать {this.props.login.user.firstName}</TabBarItem>)
    return elements;
  }

  login = () => {
    //this.getTabBarItem();
    if (!this.props.login.status) {
      return <TabBarItem right onClick={this.btnLogin.bind(this)} >Войти</TabBarItem>
    }
    else {
      return this.getTabBarItem().map(item => item)
    }
  }

  content = () => {
    switch (this.props.contentView) {
      case 0:
        return <ListUsersPage />
      case -1:
      case 1:
        return <LoginPage />
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
        <TabsBarView className='color-blue' onSelectedIndex={this.onSelectedItem} >
          {/* <TabBarItem left disabled={!this.props.login.status} >Пользователи</TabBarItem>
            <TabBarItem left disabled={!this.props.login.status} >Заявки</TabBarItem> */}
          {this.login()}
        </TabsBarView>
        {this.content()}

      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
