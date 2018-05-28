import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin } from './actions/login'
//import ListUsersPage from './view/ListUsersPage'
//import TabsBarView from './view/TabsBarView'
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
    document.readyState
    //$('.button-collapse').sideNav(this.props.options);
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
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div>
          <nav>
            <div className="nav-wrappe flex-container">
              <ul id="nav-mobile" className="left hide-on-med-and-down flex-menu">
                <div className='flex-item' >
                  <li><a href="sass.html">Sass</a></li>
                  <li><a href="badges.html">Components</a></li>
                  <li ><a href="collapsible.html">JavaScript</a></li>
                </div>
                <li className='raw-item'><a href="collapsible.html">Login</a></li>
              </ul>
              
            </div>
          </nav>

          {/* <div className='flex-menu' >
            <div className='flex-item' >
              <button onClick={this.getUser}>
                Пользователи
              </button>
            </div>
            <div className='raw-item' >
              {this.login()}
            </div>
          </div> */}
        </div>



      </div>

    );
  }
}

export default connect(mapStateToProps)(App);
