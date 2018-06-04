import React, { Component } from 'react';
import { connect } from "react-redux";
import ListView from './ListView';
import Avatar from './Avatar';
import ContactInfo from './ContactInfo';
import ToolbarPanel from './ToolbarPanel';
import UserEdit from './UserEdit';
import 'react-virtualized/styles.css';
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
      selectedUser: null,
      selectedIndex: -1,
      edit: false
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

  btnAdd = () => {
    this.setState({ 
      selectedUser: null,
      selectedIndex: -1,
      edit: true 
    })
  }

  ContentRightPanel = () => {
    if (this.state.edit) return this.userEdit();
    else return this.userInfo();
  }

  userInfo = () => {
    return (
      <div className='userInfo' >
        <div id='NamePanel' className='one-panel grey lighten-4' >
          <Avatar selectedUser={this.state.selectedUser} />
        </div>
        <div className='two-panel' >
          <ContactInfo selectedUser={this.state.selectedUser} />
        </div>
      </div>
    )
  }

  userEdit = () => {
    return <UserEdit selectedUser={this.state.selectedUser} />
  }

  render() {

    return (
      <div className="flex-container_list">
        <div className='left-panel grey lighten-4' >
          <ToolbarPanel onClick={this.btnAdd} />
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
                edit: false,
                selectedIndex: index,
              })
            }}
            setSelectedIndex={this.state.selectedIndex}
          />
        </div>
        <div className='right-panel'>
          <this.ContentRightPanel />

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
