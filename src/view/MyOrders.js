import React, { Component } from 'react';
import { connect } from "react-redux";
import './MyOrders.css'

const mapStateToProps = (state) => {
    return {
      
    };
  }

  class MyOrders extends Component {

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
          Список моих заявок на воду
        </div>  
      );
    }
  }
  export default connect(mapStateToProps)(MyOrders);