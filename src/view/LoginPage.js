import React, { Component } from 'react';
import { connect } from "react-redux";
import './LoginPage.css'

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
}

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps) {

  }

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  render() {

    return (
      <div className='login-main-panel' >
        <div className='login-left-panel'>
          <div className='img-cont' >
            <div className='cont-img' >
              <img className='img-cover' src='./img/login.png' />
            </div>
          </div>
        </div>
        <div className='login-right-panel'>
          <span className='logo'>
            <span className='logo-icon' >
              <img src='./img/logo-icon.svg' />
            </span>
            <span className='logo-text' >
              <img src='./img/logo-text.svg' />
            </span>
            <div className='login-text' >
              ВХОД
            </div>
            <div className='login-form'>
            <a class="waves-effect waves-light btn-small btn-login color-blue">Используя учетную запись</a>
              <div className="div-field">
                <input id="login" value={this.state.login} type="email" className="inp-field browser-default" onChange={this.onChange} />
                <label htmlFor="login" className={this.state.login ? 'active' : ''}>Пользователь (email)</label>
              </div>
              <div className="input-field">
                <input id="password" type="password" value={this.state.password} onChange={this.onChange} />
                <label htmlFor="password" className={this.state.password ? 'active' : ''} >Пароль</label>
              </div>
              <a class="waves-effect waves-light btn-small btn-login color-green">ВОЙТИ</a>
            </div>
          </span>

        </div>

      </div>

    );
  }
}
export default connect(mapStateToProps)(LoginPage);