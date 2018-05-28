import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import { getUsers } from './actions/users';
import { setLogin, getLogin } from './actions/login'
//import ListUsersPage from './view/ListUsersPage'
//import TabsBarView from './view/TabsBarView'
import { Navbar, NavItem } from 'react-materialize'
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

  componentDidMount() {
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

        <div className='flex-container' >
          <nav>
            <div class="nav-wrapper">
              
              <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
              </ul>
              <a href="#" class="brand-logo">Logo</a>
            </div>
          </nav>
          {/* <Navbar className='flex-menu' left>
            <div className='flex-item' >
              <NavItem >Test</NavItem>
              <NavItem>Test1</NavItem>
            </div>
            <li className='raw-item' >lwdnsfbfe</li>
          </Navbar> */}

          <div className='flex-menu' >
            <div className='flex-item' >
              <button onClick={this.getUser}>
                Пользователи
              </button>
            </div>
            <div className='raw-item' >
              {this.login()}
            </div>            
          </div>
        </div>



      </div>

    );
  }
}

export default connect(mapStateToProps)(App);
