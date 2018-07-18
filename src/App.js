import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin, getLogout } from './actions/login'
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
      openModalLogout: false,
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

  btnLogout = () => {
    this.props.dispatch(getLogout())    
    this.setState({ openModalLogout: false })
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
      elements.push(<TabBarItem key='users' left >Пользователи</TabBarItem>)

    }
    if (this.props.login.user.roles.includes('customer')) {
      elements.push(<TabBarItem key='orders' left  >Заявки</TabBarItem>)
    }
    elements.push(
      <TabBarItem key='logout' right onClick={() => {this.setState({ openModalLogout: true })}}>
        <div style={{ position: 'relative' }} >
          {this.modalLogout(this)}
          Добро пожаловать {this.props.login.user.firstName}          
        </div>
      </TabBarItem>)
    return elements;
  }

  login = () => {
    //this.getTabBarItem();
    if (!this.props.login.status) {
      return <TabBarItem key='login' right onClick={this.btnLogin.bind(this)} >Войти</TabBarItem>
    }
    else {
      return this.getTabBarItem().map(item => item)
    }
  }

  modalLogout = () => {
    return (
      <div >
        <div style={this.state.openModalLogout ? {
          position: 'fixed',
          background: 'black',
          opacity: '0.08',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: '999',
        } : null} />
        <div id='modal1' className='modal-more' style={this.state.openModalLogout ? {
          display: 'block',
          opacity: '1',
        } : null} >
          <div className='modal-more-menu' >
            <a className='modal-more-item' onClick={() => {
              this.btnLogout()
            }} >Выйти</a>
          </div>

        </div>
      </div>
    )
  }

  content = () => {
    switch (this.props.contentView) {
      case 'users':
        return <ListUsersPage />
      case 'orders':
      case -1:
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
