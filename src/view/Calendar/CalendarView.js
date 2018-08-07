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
    var data = moment(props.data);
    this.state = {
      calendar: {
        year: moment(props.data).year(),
        month: moment(props.data).month(),
        monthArray: [],
      },
      data,
      openModalSelectYear: false,
      openModalSelectMonth: false,
    }
    this._fillMonthArray = this._fillMonthArray.bind(this);
    this._upMonth = this._upMonth.bind(this);
    //console.log(moment(props.data).day())
  }

  _fillMonthArray = () => {
    var month = moment({ year: this.state.calendar.year, month: this.state.calendar.month });
    var monthArray = matrixArray(6, 7);
    var current = false;
    for (var week = 0; week <= 5; week++) {
      for (var day = 0; day <= 6; day++) {
        current = moment(month).weekday((week * 7) + (day)).isSame(moment(), 'day')
        //console.log(moment(month).weekday((week * 7) + (day)).date())
        monthArray[week][day] = {
          data: moment(month).weekday((week * 7) + (day)),
          day: moment(month).weekday((week * 7) + (day)).date(),
          month: moment(month).weekday((week * 7) + (day)).month(),
          current: current,
        }
      }
    }
    return monthArray;
  }

  _getWeekOfDay = (day) => Math.ceil(day / 7) - 1;

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
    })
  }

  _downMonth = () => {
    var month = this.state.calendar.month;
    var year = this.state.calendar.year;
    if (month === 0) {
      month = 11;
      year--;
    }
    else month--;
    this.setState({
      calendar: {
        ...this.state.calendar,
        month,
        year,
      }
    })
  }

  componentWillMount() {
    //this._fillMonthArray()
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
      <div style={{ justifyContent: 'space-between', textTransform: 'capitalize' }} className='flex-row' >
        {
          dayweek.map((day, i) => <span key={i} style={{ height: 30, width: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', }} >{day}</span>)
        }
      </div>)
  }

  _onClick = (data) => {
    //event.preventDefault();
    this.setState({
      data,
    })
    console.log()

  }

  _fillSelectYear = (year) => {
    return [
      year - 2,
      year - 1,
      year,
      year + 1
    ]
  }

  _fillSelectMonth = () => {
    var arrayMonth = [];
    for (var m = 0; m <= 11; m++) {
      arrayMonth.push(moment().month(m).format('MMMM'));
    }
    return arrayMonth;
  }

  modalSelectYear = () => {
    return (
      <div >
        <div style={this.state.openModalSelectYear ? {
          position: 'fixed',
          background: 'transparen',
          opacity: '0.00',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: '999',
        } : null}
          onClick={() => {
            this.setState({ openModalSelectYear: false })
          }} />
        <div id='modal1' className='modal-dropdown' style={this.state.openModalSelectYear ? {
          display: 'block',
          opacity: '1',
          padding: '8px 0px'
        } : null} >
          <div className='dropdown-menu' >
            {this._fillSelectYear(this.state.calendar.year).map(year => <a className='dropdown-item' onClick={() => {
              this.setState({
                openModalSelectYear: false,
                calendar: {
                  ...this.state.calendar,
                  year
                }
              })

            }} >{year}</a>)}
          </div>

        </div>
      </div>
    )
  }

  modalSelectMonth = () => {
    return (
      <div >
        <div style={this.state.openModalSelectMonth ? {
          position: 'fixed',
          background: 'transparen',
          opacity: '0.00',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: '999',
        } : null}
          onClick={() => {
            this.setState({ openModalSelectMonth: false })
          }} />
        <div id='modal1' className='modal-dropdown' style={this.state.openModalSelectMonth ? {
          display: 'block',
          opacity: '1',
          padding: '8px 0px'
        } : null} >
          <div className='dropdown-menu' style={{ height: 200, overflow: 'auto' }} >
            {this._fillSelectMonth().map((month, m) => <a className='dropdown-item' onClick={() => {
              this.setState({
                openModalSelectMonth: false,
                calendar: {
                  ...this.state.calendar,
                  month: m
                }
              })

            }} >{month}</a>)}
          </div>

        </div>
      </div>
    )
  }

  _selectYear = (year) => <div className={(this.state.openModalSelectMonth) ? 'flex-row ' : 'flex-row '} style={{ display: 'flex', position: 'relative', alignSelf: 'stretch' }} >
    <div className={(this.state.openModalSelectMonth) ? 'flex-row not-year' : 'flex-row select-year'} >
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'stretch',
          alignItems: 'center',
          margin: 1
        }} >
        {year}
      </div>
      <div style={{ position: 'relative' }} >
        <a
          className='btn-select-day'
          onClick={() => this.setState({ openModalSelectYear: true })}
          style={{
            height: 32,
            width: 32,
            margin: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            //fontSize: 20,
          }} >
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={(this.state.openModalSelectYear) ? "icon-down-arrow dropdown-active" : "icon-down-arrow"}>
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </a>
        {this.modalSelectYear(this)}
      </div>
    </div>
  </div>


  _selectMonth = (calendar) =>
    <div className="flex-row"
      style={{
        display: 'flex',
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
      }} >
      <a
        className='btn-select-day'
        onClick={this._downMonth}
        style={{
          height: 32,
          width: 32,
          margin: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          //fontSize: 20,
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon-svg' >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </a>
      <div className='flex-row' style={{ flex: 'auto' }} >
        <div style={
          {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            margin: 1,
            cursor: 'arrow',
            userSelect: 'none'
          }} >
          {moment({ year: calendar.year, month: calendar.month }).format('MMMM')}
        </div>
        <div style={{ position: 'relative', alignSelf: 'flex-end' }} >
          <a
            className='btn-select-day'
            onClick={() => this.setState({ openModalSelectMonth: true })}
            style={{
              height: 32,
              width: 32,
              margin: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              //fontSize: 20,
            }} >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={(this.state.openModalSelectMonth) ? "icon-down-arrow dropdown-active" : "icon-down-arrow"}>
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </a>
          {this.modalSelectMonth(this)}
        </div>
      </div>

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
        }} >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon-svg' >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </a>
    </div>

  render() {
    const calendar = this.state.calendar;
    //const arr = calendar.monthArray;
    const arr = this._fillMonthArray();
    const data = this.state.data;

    // return (
    //   <div style={{
    //     justifyContent: 'space-between',
    //     //fontSize: 20,
    //     border: '1px solid #e0e0e0'
    //   }}
    //     className="flex-column">
    //     <div style={{ borderBottom: '1px solid #e0e0e0', alignItems: 'center', textTransform: 'capitalize' }} className="flex-row">
    //       {this._selectMonth(calendar)}
    //       {this._selectYear(calendar.year)}
    //     </div>

    //     {this.dayweek()}
    //     {arr.map((week, wi) => <div key={wi} style={{ justifyContent: 'space-between' }} className='flex-row' >
    //       {week.map((day, di) =>
    //         <a key={di}
    //           className={(moment(data).isSame(day.data)) ? day.month !== calendar.month ? 'btn-select-day no-current-month active' : 'btn-select-day active' : (day.current) ? 'btn-select-day current' : day.month !== calendar.month ? 'btn-select-day no-current-month' : 'btn-select-day'}
    //           onClick={() => this._onClick(day.data)}
    //           style={{
    //             height: 32,
    //             width: 32,
    //             margin: 1,
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             //fontSize: 20,
    //             //opacity: day.month !== calendar.month ? '.4' : '1'
    //           }} >
    //           {day.day}
    //         </a>
    //       )}</div>
    //     )}
    //   </div>
    // );
    return (
      <div style={{ width: 100, position: 'relative' }} className='flex-row' >
        <div style={{ flex: 1, background: 'green' }} >

        </div>
        <div className='test' style={{ flex: 1, background: 'red' }} >
          <div style={{ width: 50, height: 50 }} />
        </div>
      </div>

    )
  }
}
//export default connect(mapStateToProps)(LoginPage);
export default Calendar;