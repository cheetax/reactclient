import React, { Component } from 'react';
import { connect } from "react-redux";
import ListView from './ListView';
import UserInfo from './UserInfo'
import ContactInfo from './ContactInfo'
import 'react-virtualized/styles.css'
import './ListUsersPage.css';

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
}

class ListUsersPage extends Component {

  constructor(props) {
    super(props)
    this.rowRenderer = this.rowRenderer.bind(this)
    this.state = {
      selectedUser: null
    }
  }

  componentWillMount() {

  }
  users = () => {
    return this.props.users
  };

  rowRen = (_obj) => {
    return <div>test</div>
  }

  rowRenderer = ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) => {
    return (
      <div className='valign-wrapper' >
        {this.props.users[index].firstName} {this.props.users[index].surName}
      </div>
    )
  }

  render() {

    return (
      <div className="flex-container_list">
        <div className='left-panel grey lighten-4' >
          <div className='my-btn' >
            <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => { }} ><i className="material-icons center" style={{ fontSize: '28px' }} >add</i></a>
          </div>

        </div>
        <div className='center-panel' >
          <ListView
            className='collection'
            items={this.props.users}
            rowHeight={42}
            rowRenderer={this.rowRenderer}
            onSelectedIndex={(index) => {
              this.setState({
                selectedUser: this.props.users[index],
              })
            }}
          />
        </div>
        <div className='right-panel' >
          <div id='NamePanel' className='one-panel grey lighten-4' >
            <UserInfo selectedUser={this.state.selectedUser} />
          </div>
          <div className='two-panel' >
            <ContactInfo selectedUser={this.state.selectedUser} />
          </div>

        </div>
        <div >

        </div>
        <div  ></div>
      </div>

    );
  }
}
export default connect(mapStateToProps)(ListUsersPage);
//export default App;
