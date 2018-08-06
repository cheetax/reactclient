import React, { Component } from 'react';
import { connect } from "react-redux";
import Calendar from './Calendar/CalendarView'
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');
//console.log(moment().format('dddd, MMMM DD YYYY, h:mm:ss'))
//import './LoginPage.css'

const mapStateToProps = (state) => {
  return {

  };
}

class SelectTimePeriod extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataFrom: moment(props.dataFrom, 'DD-MM-YYYY').startOf('day') || moment().startOf('day'),
      dataTo: moment(props.dataTo, 'DD-MM-YYYY').endOf('day') || moment().endOf('day'),
      resultType: null,
    }
  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps) {

  }

  _upPeriod = () => {
    var dataFrom = this.state.dataFrom.clone(),
      dataTo = this.state.dataTo.clone();
    if (this.state.resultType) {
      dataFrom.add(1, this.state.resultType)
      dataTo.add(1, this.state.resultType).endOf(this.state.resultType)
    }
    else {
      var dataFrom = this.state.dataFrom.clone(),
        dataTo = this.state.dataTo.clone();
      var dayFrom = moment(dataFrom).date(),
        dayTo = moment(dataTo).date();
      var diff = dataTo.diff(dataFrom, 'month');
      if (diff > 0) {
        if (dayFrom === 1 && dayTo === 15) {
          dataFrom.add(diff, 'month').date(16);
          dataTo.add(diff, 'month').endOf('month');
        }
        else if (dayFrom === 16 && dayTo === moment(dataTo).endOf('month').date()) {
          dataFrom.add(diff, 'month').date(1);
          dataTo.add(diff, 'month').date(15);
        }
        else {
          diff = dataTo.diff(dataFrom, 'days')
          dataFrom.add(diff + 1, 'days').startOf('day');
          dataTo.add(diff + 1, 'days').endOf('day');
        }
      }
      else {
        diff = dataTo.diff(dataFrom, 'days')
        if (dayFrom === 1 && dayTo === 15) {
          dataFrom.add(diff, 'days').date(16);
          dataTo.endOf('month');
        }
        else if (dayFrom === 16 && dayTo === moment(dataTo).endOf('month').date()) {
          dataFrom.add(diff+1, 'days').date(1);
          dataTo.add(diff, 'days').date(15);
        }
        else {          
          dataFrom.add(diff + 1, 'days').startOf('day');
          dataTo.add(diff + 1, 'days').endOf('day');
        }
      }
      console.log()
      this.setState({
        dataFrom: dataFrom,
        dataTo: dataTo,
      })
    }
  }

  _downPeriod = () => {
    var dataFrom = this.state.dataFrom.clone(),
      dataTo = this.state.dataTo.clone();
    if (this.state.resultType) {
      dataFrom.subtract(1, this.state.resultType)
      dataTo.subtract(1, this.state.resultType).endOf(this.state.resultType)
    }
    else {
      var dataFrom = this.state.dataFrom.clone(),
        dataTo = this.state.dataTo.clone();
      var dayFrom = moment(dataFrom).date(),
        dayTo = moment(dataTo).date();
      var diff = dataTo.diff(dataFrom, 'month');
      if (diff > 0) {
        if (dayFrom === 1 && dayTo === 15) {
          dataFrom.subtract(diff, 'month').date(16);
          dataTo.subtract(diff, 'month').endOf('month');
        }
        else if (dayFrom === 16 && dayTo === moment(dataTo).endOf('month').date()) {
          dataFrom.subtract(diff, 'month').date(1);
          dataTo.subtract(diff, 'month').date(15);
        }
        else {
          diff = dataTo.diff(dataFrom, 'days')
          dataFrom.subtract(diff + 1, 'days').startOf('day');
          dataTo.subtract(diff + 1, 'days').endOf('day');
        }
      }
      else {
        diff = dataTo.diff(dataFrom, 'days')
        if (dayFrom === 1 && dayTo === 15) {
          dataFrom.subtract(diff, 'days').date(16);
          dataTo.subtract(diff+1, 'days').endOf('month');
        }
        else if (dayFrom === 16 && dayTo === moment(dataTo).endOf('month').date()) {
          dataFrom.subtract(diff, 'days').date(1);
          dataTo.subtract(diff, 'days').date(15);
        }
        else {          
          dataFrom.subtract(diff + 1, 'days').startOf('day');
          dataTo.subtract(diff + 1, 'days').endOf('day');
        }
      }
    }
    this.setState({
      dataFrom: dataFrom,
      dataTo: dataTo,
    })

  }

  getPeriodToString = () => {

    var result = (this.state.dataFrom.format('L') + ' - ' + this.state.dataTo.format('L'));
    var resultType = null;
    //var qu = moment(this.state.dataFrom).startOf('quarter');
    if (this.state.dataFrom.valueOf() === moment(this.state.dataTo).startOf('day').valueOf()) {
      result = this.state.dataFrom.format('L');
      resultType = 'day';
    }
    else if (moment(this.state.dataFrom).startOf('year').valueOf() === this.state.dataFrom.valueOf() &&
      moment(this.state.dataFrom).endOf('year').valueOf() === this.state.dataTo.valueOf()) {
      result = moment(this.state.dataFrom).year() + ' год';
      resultType = 'year';
    }
    else if (moment(this.state.dataFrom).startOf('month').valueOf() === this.state.dataFrom.valueOf() &&
      moment(this.state.dataFrom).endOf('month').valueOf() === this.state.dataTo.valueOf()) {
      result = this.state.dataFrom.format('MMMM YYYY');
      resultType = 'month';
    }
    else if (moment(this.state.dataFrom).startOf('quarter').valueOf() === this.state.dataFrom.valueOf() &&
      moment(this.state.dataFrom).endOf('quarter').valueOf() === this.state.dataTo.valueOf()) {
      result = this.state.dataFrom.format('Qo') + ' квартал';
      resultType = 'quarter';
    }   //if ()
//    console.log(moment(this.state.dataFrom).endOf('month').format())
    if (this.state.resultType !== resultType) {
      this.setState({
        resultType: resultType,
      })
    }
    //var endMonth = this.state.dataFrom.endOf('month');
    return result;
  }


  render() {

    return (
      <div className="flex-row">
        
        <a className='waves-effect waves-light btn-floating btn'
          onClick={() => this._downPeriod()} >
          <i className="material-icons"  >keyboard_arrow_left</i>
        </a>
        <a className='waves-effect waves-light btn-raised-floating btn'
          style={{ margin: '0 10px' }}
          onClick={() => this._upPeriod()} >
          <div>{this.getPeriodToString()}</div>
        </a>
        <a className='waves-effect waves-light btn-floating btn'
          onClick={() => this._upPeriod()} >
          <i className="material-icons"  >keyboard_arrow_right</i>
        </a>
        <Calendar data={moment('15/08/18', 'DD-MM-YY').toObject()} />

      </div>
    );
  }
}
export default connect(mapStateToProps)(SelectTimePeriod);