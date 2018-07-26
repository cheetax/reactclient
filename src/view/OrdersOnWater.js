import React, { Component } from 'react';
import { connect } from "react-redux";
import './OrdersOnWater.css'

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    visibleAddButtons: state.orders.status,
  };
}

class OrdersOnWater extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visibleAddButtons: false,
    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'GET_ORDERS',
      payload: {},
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
        Заказы подразделений на воду
        </div>
    );
  }
}
export default connect(mapStateToProps)(OrdersOnWater);