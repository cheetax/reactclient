import React, { Component } from 'react';
import { connect } from "react-redux";
import './ListUsersPage.css';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    //login: state.login
  };
}

class ListUsersPage extends Component {

  componentWillMount() {

  }

  render() {

    return (
      <div className="flex-container_list">
        <div className='left-panel' >
          <a>+</a>
        </div>  
        <div className='center-panel' >
          <a>+</a>
        </div>
        <div >
          {this.props.users.map(item => <p>{item.name}</p>)}
        </div>
        <div  ></div>
      </div>

    );
  }
}
export default connect(mapStateToProps)(ListUsersPage);
//export default App;
