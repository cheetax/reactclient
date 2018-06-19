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

    }
  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps) {

  }


  render() {

    return (
      <div className='img-cont' >
        <div className='cont-img' >
          <img className='img-cover' src='./img/login.jpg' />
        </div>
        
      </div>
    );
  }
}
export default connect(mapStateToProps)(LoginPage);