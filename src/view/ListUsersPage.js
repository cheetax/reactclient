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
      <div className="App">        
                <div>
          {this.props.users.map(item => <p>{item.name}</p>)}
        </div>

      </div>

    );
  }
}
export default connect(mapStateToProps)(ListUsersPage);
//export default App;
