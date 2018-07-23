import React, { Component } from 'react';
import { connect } from "react-redux";
import './OrdersOnWater.css'

const mapStateToProps = (state) => {
    return {
      
    };
  }

  class OrdersOnWater extends Component {

    constructor(props) {
      super(props)      
      this.state = {
        
      }
    }  
      
    componentWillMount() {
      
    }
  
    componentDidUpdate(prevProps) {
      
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