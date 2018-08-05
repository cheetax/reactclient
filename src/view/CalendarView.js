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
      selectDay: { w: this._getWeekOfDay(moment(props.data).date()), d: moment(props.data).day() - 1 },
      data,
      openModalMore: false,
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
        current = moment(month).day((week * 7) + (day + 1)).isSame(moment(), 'day')
        if ((selectDay.w === null && selectDay.d === null) && current) selectDay = { w: week, d: day }
        monthArray[week][day] = {
          day: moment(month).day((week * 7) + (day + 1)).date(),
          month: moment(month).day((week * 7) + (day + 1)).month(),
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
      <div style={{ justifyContent: 'space-between', textTransform: 'capitalize' }} className='flex-row' >
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

  _fillSelectYear = (year) => {
    return [
      year - 2,
      year - 1,
      year,
      year + 1
    ]
  }

  modalMore = () => {
    return (
      <div >
        <div style={this.state.openModalMore ? {
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
            this.setState({ openModalMore: false })
          }} />
        <div id='modal1' className='modal-dropdown' style={this.state.openModalMore ? {
          display: 'block',
          opacity: '1',
          padding: '8px 0px'
        } : null} >
          <div className='dropdown-menu' >
            {this._fillSelectYear(this.state.calendar.year).map(year => <a className='dropdown-item' onClick={() => {
              this.setState({
                openModalMore: false,
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
                alignItems: 'center'
                //fontSize: 20,
              }} > <i className="material-icons"  >keyboard_arrow_left</i>
            </a>
            <div style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              'align-self': 'stretch',
              'align-items': 'center',
              margin: 1,
              cursor: 'arrow',
              userSelect: 'none'
            }} >{moment({ year: calendar.year, month: calendar.month }).format('MMMM')}</div>
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
          <div className='flex-column'
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              'align-self': 'stretch',
              'align-items': 'center',
              margin: 1
            }} >
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                'align-self': 'stretch',
                'align-items': 'center',
                margin: 1,
                cursor: 'arrow',
                userSelect: 'none'
              }}>{calendar.year}</div>
          </div>
          <div style={{ position: 'relative' }} >
            <a
              className='btn-select-day'
              onClick={() => this.setState({ openModalMore: true })}
              style={{
                height: 32,
                width: 32,
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //fontSize: 20,
              }} >
              <i className={(this.state.openModalMore) ? "icon-down-arrow dropdown-active" : "icon-down-arrow"}></i>
              {/* <i className='icon-down-arrow '></i> */}
            </a>            
            {this.modalMore(this)}
          </div>
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