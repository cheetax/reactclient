import React, { Component } from 'react';
import { connect } from "react-redux";
import  ListView from './ListView'
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
      <a
        className="collection-item"  
        key={key}
        style={style}
        href='#!'
      >
        {this.props.users[index].name}
      </a>
    )
  }

  render() {

    return (
      <div className="flex-container_list">
        <div className='left-panel' >
          <i className="material-icons md-28">add</i>
        </div>
        <div className='center-panel' >
          <ListView users = {this.props.users}/>
        </div>
        <div className='right-panel' >
          <div className='one-panel' >

            <i className="material-icons md-28">add</i>
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
