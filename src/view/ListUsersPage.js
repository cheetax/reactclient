import React, { Component } from 'react';
import { connect } from "react-redux";
import ListView from './ListView'
import 'react-virtualized/styles.css'
import './ListUsersPage.css';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    //login: state.login
  };
}

class ListUsersPage extends Component {

  constructor(props) {
    super(props)
    //this.rowRen = this.rowRen.bind(this)
    this.rowRenderer = this.rowRenderer.bind(this)
    this.state = {
      selectedUser: {}
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
      <div>
        Наименование:
        <div>
          {this.props.users[index].name}
        </div>

      </div>
    )
  }

  render() {

    return (
      <div className="flex-container_list">
        <div className='left-panel' >
          <i className="material-icons md-28">add</i>
        </div>
        <div className='center-panel' >
          <ListView
            items={this.props.users}
            rowHeight={72}
            rowRenderer={this.rowRenderer}
            onSelectedIndex={(index) => {
              this.setState({
                selectedUser: this.props.users[index],
              })
            }}
          />
        </div>
        <div className='right-panel' >
          <div id='NamePanel' className='one-panel' >
            <i className="material-icons md-28">add</i>
            <div>{this.state.selectedUser.name}</div>
          </div>
          <div className='two-panel' >
            <i className="material-icons md-28">add</i>
          </div>
          <div className='three-panel' >

            <i className="material-icons md-28">add</i>
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
