import React, { Component } from 'react';
import { connect } from "react-redux";
import ListView from './ListView';
import Avatar from './Avatar';
import ContactInfo from './ContactInfo';
import ToolbarPanel from './ToolbarPanel';
import UserEdit from './UserEdit';
import { getUsers } from '../actions/users';
import 'react-virtualized/styles.css';
import './ListUsersPage.css';

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    visibleAddButtons: state.users.status,
    newUser: state.users.newUser,
    roles: state.roles,
  };
}

class ListUsersPage extends Component {

  constructor(props) {
    super(props)
    this.rowRenderer = this.rowRenderer.bind(this)
    this.btnDelete = this.btnDelete.bind(this)
    this.state = {
      selectedUser: null,
      prevSelectedIndex: -1,
      selectedIndex: -1,
      edit: false,
      newUser: {},
      visibleAddButtons: false,
    }
  }

  componentWillUpdate(e, r) {

  }

  componentWillMount() {
    this.props.dispatch({
      type: 'GET_ROLES',
      payload: {},
    })
    this.props.dispatch(getUsers());
  }

  componentWillUnmount() {
   // this.setState({ visibleAddButtons: this.props.visibleAddButtons })
    this.props.dispatch({
      type: 'INITIAL_USERS',
      payload: {}
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.visibleAddButtons !== this.state.visibleAddButtons) {
      //   var index = this.props.users.findIndex(item => item.id === this.props.newUser.id);
      //   if (index !== -1) {
      this.setState({
        visibleAddButtons: this.props.visibleAddButtons
        //       newUser: this.props.newUser,
        //       selectedIndex: index,
        //       selectedUser: this.props.users[index],
      })      //   }
    }
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
    if (this.props.users.length - 1 < index) return null;
    return (
      <div className='valign-wrapper' >
        {this.props.users[index].firstName} {this.props.users[index].surName}
      </div>
    )
  }

  btnAdd = () => {
    var user = {
      id: '',
      firstName: '',
      surName: '',
      phone: '',
      email: '',
      post: '',
      office: '',
      usePassword: false,
      password: '',
      roles: []
    }
    this.setState({
      selectedUser: user,
      prevSelectedIndex: this.state.selectedIndex,
      selectedIndex: -1,
      edit: true
    })
  }

  btnEdit = () => {
    this.setState({
      prevSelectedIndex: this.state.selectedIndex,
      edit: true
    })
  }

  btnDelete = () => {

    if (this.state.selectedIndex == this.props.users.length - 1) {
      this.setState({
        selectedUser: this.props.users[this.state.selectedIndex - 1],
        selectedIndex: this.state.selectedIndex - 1,
        edit: false
      })
    }
    else {
      this.setState({
        selectedUser: this.props.users[this.state.selectedIndex + 1],
        edit: false
      })
    }
    this.props.dispatch({
      type: 'DELETE_USER',
      payload: this.state.selectedUser
    })

  }

  btnSave = (editUser) => {
    var user = null;
    var index = -1;
    if (editUser !== null) {
      if (this.state.selectedUser.id) {
        this.props.dispatch({
          type: 'EDIT_USER',
          payload: editUser
        })

      }
      else {
        this.props.dispatch({
          type: 'ADD_USER',
          payload: editUser
        })
      }
    }
    else {
      index = this.state.prevSelectedIndex;
      user = this.props.users[index];
    }
    this.setState({
      selectedUser: user,
      selectedIndex: index,
      edit: false
    })
  }


  ContentRightPanel = () => {
    if (this.state.edit) return this.userEdit();
    else return this.userInfo();
  }

  userInfo = () => {
    return (
      <div className='userInfo' >

        <div className='two-panel' >
          <ContactInfo selectedUser={this.state.selectedUser} btnEdit={this.btnEdit} btnDelete={this.btnDelete} roles={this.props.roles} />
        </div>
      </div>
    )
  }

  userEdit = () => {
    return <UserEdit selectedUser={this.state.selectedUser} btnSave={this.btnSave} btnDelete={this.btnDelete} roles={this.props.roles} />
  }

  render() {

    return (
      <div className="flex-container_list">
        {/* <div className='left-panel grey lighten-4' >
          <ToolbarPanel onClick={this.btnAdd} />
        </div> */}
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
                newUser: {},
              })
            }}
          //setSelectedIndex={this.state.selectedIndex}
          />
          <div style={{ position: 'relative' }} >
            <div id='modal1' className='' style={{
              position: 'absolute',
              display: 'flex',
              opacity: '1',
              bottom: '100%',
              right: '0px',
              margin: '16px 34px',
              zIndex: '1000',
              height: '56px',
              width: '56px',
              justifyContent: 'center',
              alignItems: 'center',
            }} >
              <a className={this.state.visibleAddButtons ? 'waves-effect waves-light btn-floating btn-large' : 'waves-effect waves-light btn-floating btn-0'} onClick={() => this.btnAdd()} ><i className="material-icons"  >add</i></a>
            </div>
          </div>
        </div>
        <div className='right-panel'>
          <this.ContentRightPanel />
        </div>
        <div >

        </div>
        <div  ></div>
      </div >

    );
  }
}
export default connect(mapStateToProps)(ListUsersPage);
//export default App;
