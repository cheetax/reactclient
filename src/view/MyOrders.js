import React, { Component } from 'react';
import { connect } from "react-redux";
import './MyOrders.css'

const mapStateToProps = (state) => {
  return {
    login: state.login,
    orders: state.orders.orders,
    visibleAddButtons: state.orders.status,
  };
}

class MyOrders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visibleAddButtons: false,
    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'SET_FILTER',
      payload: {user: this.props.login.user},
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.visibleAddButtons !== this.state.visibleAddButtons) {
      this.setState({
        visibleAddButtons: this.props.visibleAddButtons
      })
    }
  }

  render() {

    return (
      <div className="flex-container_list">
        Список моих заявок на воду
        </div>
    );
  }
}
export default connect(mapStateToProps)(MyOrders);