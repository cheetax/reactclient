import React, { Component } from 'react';
import { connect } from "react-redux";
import ListView from './ListView';
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
    this.rowRenderer = this.rowRenderer.bind(this)
    this.btnDelete = this.btnDelete.bind(this)
    this.state = {
      selectedOrder: null,
      prevSelectedIndex: -1,
      selectedIndex: -1,
      edit: false,
      newOrder: {},
      visibleAddButtons: false,
    }
  }

  componentWillUpdate(e, r) {

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

  componentWillUnmount() {
    // this.setState({ visibleAddButtons: this.props.visibleAddButtons })
    this.props.dispatch({
      type: 'INITIAL_ORDERS',
      payload: {}
    })
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
    if (this.props.orders.length - 1 < index) return null;
    return [
      <span style={{ paddingRight: 10 }} >{this.props.orders[index].data}</span>,
      <span style={{ paddingRight: 10 }} >{this.props.orders[index].nomer}</span>
    ]
  }

  headerRenderer = (param) => [
    <span width={50} style={param.style}>Дата</span>,
    <span width={100} style={param.style}>Номер</span>,
    <span width={150} style={param.style}  >Место доставки</span>,
    <span width={150} style={param.style}  >Тип тары</span>,
    <span width={150} style={param.style}>Количество</span>,
    <span style={param.style}>Контактное лицо</span>
  ]

  btnAdd = () => {
    var order = {
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
      selectedOrder: order,
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

    if (this.state.selectedIndex == this.props.orders.length - 1) {
      this.setState({
        selectedOrder: this.props.orders[this.state.selectedIndex - 1],
        selectedIndex: this.state.selectedIndex - 1,
        edit: false
      })
    }
    else {
      this.setState({
        selectedOrder: this.props.orders[this.state.selectedIndex + 1],
        edit: false
      })
    }
    this.props.dispatch({
      type: 'DELETE_ORDER',
      payload: this.state.selectedOrder
    })

  }

  btnSave = (editOrder) => {
    var order = null;
    var index = -1;
    if (editOrder !== null) {
      if (this.state.selectedOrder.id) {
        this.props.dispatch({
          type: 'EDIT_ORDER',
          payload: editOrder
        })

      }
      else {
        this.props.dispatch({
          type: 'ADD_ORDER',
          payload: editOrder
        })
      }
    }
    else {
      index = this.state.prevSelectedIndex;
      order = this.props.orders[index];
    }
    this.setState({
      selectedOrder: order,
      selectedIndex: index,
      edit: false
    })
  }

  render() {

    return (
      <div className="flex-container_list">
        <div >
          Панель фильтров
        </div>
        <div className='center-panel' >
          <ListView
            headerRenderer={this.headerRenderer}
            className='collection'
            items={this.props.orders}
            rowHeight={42}
            rowRenderer={this.rowRenderer}
            onSelectedIndex={(index) => {
              this.setState({
                selectedOrder: this.props.orders[index],
                edit: false,
                selectedIndex: index,
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

        <div >

        </div>
        <div  ></div>
      </div >

    );
  }
}
export default connect(mapStateToProps)(MyOrders);