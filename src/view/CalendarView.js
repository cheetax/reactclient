import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');
//import { connect } from "react-redux";
//import './LoginPage.css'

// const mapStateToProps = (state) => {
//   return {

//   };
// }

const matrixArray = (row, col) => {
  var arr = new Array(row);
  for (var i = 0; i < row; i++) {
    arr[i] = new Array(col);
  }
  return arr;
}

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      calendar: {
        year: moment(props.data).year(),
        month: moment(props.data).month(),
        monthArray: [],
      },
      data: moment(props.data),
    }
  }

  componentWillMount() {
    var month = moment({ year: this.state.calendar.year, month: this.state.calendar.month });
    var monthArray = matrixArray(6, 7);
    for (var week = 0; week <= 5; week++) {
      for (var day = 0; day <= 6; day++) {
        monthArray[week][day] = moment(month).day((week * 7) + (day + 1)).date()
      }
    }
    this.setState({
      calendar: {
        ...this.state.calendar,
        monthArray,
      }
    })
    console.log(monthArray);
  }

  componentDidUpdate(prevProps) {

  }


  render() {
    const arr = this.state.calendar.monthArray;
    return (
      <div style={{justifyContent: 'space-between'}} className="flex-column">
        {arr.map((week) => {
          return <div style={{justifyContent: 'space-between'}} className='flex-row' >{week.map((day) => {
            return <span style={{height: 40, width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20}} >{day}</span>
          })}</div>
        })}
      </div>
    );
  }
}
//export default connect(mapStateToProps)(LoginPage);
export default Calendar;