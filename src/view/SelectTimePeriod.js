import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');
console.log(moment().format('dddd, MMMM DD YYYY, h:mm:ss'))
//import './LoginPage.css'

const mapStateToProps = (state) => {
  return {

  };
}

class SelectTimePeriod extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataFrom: props.dataFrom || moment().startOf('day'),
      dataTo: props.dataFrom || moment().endOf('month'),
    }
  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps) {

  }

  getPeriodToString = () => {
    var result = (this.state.dataFrom.format('L') + ' - ' + this.state.dataTo.format('L'));
    if (this.state.dataFrom.valueOf() ===  moment(this.state.dataTo).startOf('day').valueOf()) result = this.state.dataFrom.format('L');
    if (moment(this.state.dataFrom).date() === 1) { 
      switch (this.state.dataTo.valueOf()) {
        case moment(this.state.dataTo).endOf('month').valueOf():
          result = this.state.dataFrom.format('MMMM YYYY');
          break;
            
        //=== moment(this.state.dataTo).startOf('month').valueOf()) result = this.state.dataFrom.format('L');
      }
    }

    //if ()
    //var endMonth = this.state.dataFrom.endOf('month');
    return result
  }


  render() {

    return (
      <div className="flex-row">
        <a className='waves-effect waves-light btn-floating btn'
          onClick={() => { }} >
          <i className="material-icons"  >keyboard_arrow_left</i>
        </a>
        <a className='waves-effect waves-light btn-raised-floating btn'
          style={{ margin: '0 10px' }}
          onClick={() => { }} >
          <div>{this.getPeriodToString()}</div>
        </a>
        <a className='waves-effect waves-light btn-floating btn'
          onClick={() => { }} >
          <i className="material-icons"  >keyboard_arrow_right</i>
        </a>


      </div>
    );
  }
}
export default connect(mapStateToProps)(SelectTimePeriod);