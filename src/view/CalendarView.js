import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import './CalendarView.css'

moment.locale('ru');
//import { connect } from "react-redux";


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
      selectDay: { w: null, d: null },
      data: moment(props.data),
    }
    this._fillMonthArray = this._fillMonthArray.bind(this);
    this._upMonth = this._upMonth.bind(this);
    //console.log(moment(props.data).day())
  }

  _fillMonthArray = () => {
    var month = moment({ year: this.state.calendar.year, month: this.state.calendar.month });
    var monthArray = matrixArray(6, 7);
    var selectDay = this.state.selectDay;
    var current = false;
    for (var week = 0; week <= 5; week++) {
      for (var day = 0; day <= 6; day++) {
        current = moment(month).day((week * 7) + (day + 1)).isSame(this.state.data, 'day')
        if ((selectDay.w === null && selectDay.d === null) && current) selectDay = { w: week, d: day }
        monthArray[week][day] = {
          day: moment(month).day((week * 7) + (day + 1)).date(),
          month: moment(month).day((week * 7) + (day + 1)).month(),
          current: current,
        }
      }
    }
    return monthArray;
    // this.setState({
    //   calendar: {
    //     ...this.state.calendar,
    //     monthArray,
    //   },
    //   selectDay: selectDay,
    // })
  }

  _upMonth = () => {
    var month = this.state.calendar.month;
    var year = this.state.calendar.year;
    if (month === 11) {
      month = 0;
      year++;
    }
    else month++;
    this.setState({
      calendar: {
        ...this.state.calendar,
        month,
        year,
      }
    },
      //this._fillMonthArray()
    )
    // this.setState({
    //   test:222,
    //   calendar: {
    //     ...this.state.calendar,
    //     month: month,
    //     year: year,
    //   },
    // }, this._fillMonthArray())
    //this._fillMonthArray();
  }

  _downMonth = () => {

  }

  componentWillMount() {
    this._fillMonthArray()
    //console.log(monthArray);
  }

  componentDidUpdate(prevProps) {

  }

  dayweek = () => {
    var dayweek = [];
    for (var i = 0; i <= 6; i++) {
      dayweek[i] = moment().day(i + 1).format('dd');
    }
    return (
      <div style={{ justifyContent: 'space-between' }} className='flex-row' >
        {
          dayweek.map((day, i) => <span key={i} style={{ height: 30, width: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', }} >{day}</span>)
        }
      </div>)
  }

  _onClick = (w, d) => {
    //event.preventDefault();
    this.setState({ selectDay: { w, d } })
    console.log()

  }



  render() {
    const calendar = this.state.calendar;
    //const arr = calendar.monthArray;
    const arr = this._fillMonthArray();
    const selectDay = this.state.selectDay;

    return (
      <div style={{
        justifyContent: 'space-between',
        //fontSize: 20,
        border: '1px solid #e0e0e0'
      }}
        className="flex-column">
        <div style={{ borderBottom: '1px solid #e0e0e0', alignItems: 'center', textTransform: 'capitalize' }} className="flex-row">
          <div className="flex-row" style={{ display: 'flex', flex: 3, justifyContent: 'space-between', alignItems: 'center' }} >
            <a
              className='btn-select-day'
              onClick={this._downMonth}
              style={{
                height: 32,
                width: 32,
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //fontSize: 20,
              }} > <i className="material-icons"  >keyboard_arrow_left</i>
            </a>
            <div >{moment({ year: calendar.year, month: calendar.month }).format('MMMM')}</div>
            <a
              className='btn-select-day'
              onClick={this._upMonth}
              style={{
                height: 32,
                width: 32,
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //fontSize: 20,
              }} > <i className="material-icons"  >keyboard_arrow_right</i>
            </a>
          </div>

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>2018</div>
        </div>


        {this.dayweek()}
        {arr.map((week, wi) => <div key={wi} style={{ justifyContent: 'space-between' }} className='flex-row' >
          {week.map((day, di) =>
            <a key={di}
              className={(wi === selectDay.w && di === selectDay.d) ? 'btn-select-day active' : (day.current) ? 'btn-select-day current' : 'btn-select-day'}
              onClick={() => this._onClick(wi, di)}
              style={{
                height: 32,
                width: 32,
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //fontSize: 20,
                opacity: day.month !== calendar.month ? '.4' : '1'
              }} >
              {day.day}
            </a>
          )}</div>
        )}
      </div>
    );
  }
}
//export default connect(mapStateToProps)(LoginPage);
export default Calendar;