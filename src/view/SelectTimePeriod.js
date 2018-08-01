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
      dataFrom: props.dataFrom || moment().startOf('month'),
      dataTo: props.dataFrom || moment().endOf('month'),
      resultType: null,
    }
  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps) {

  }

  _upPeriod = () => {
    if (this.state.resultType) {
      var dataFrom = this.state.dataFrom.add(1, this.state.resultType)
      var dataTo = this.state.dataTo.add(1, this.state.resultType)
      this.setState({
        dataFrom: dataFrom,
        dataTo: dataTo,
      })
    }
  }

  _downPeriod = () => {
    if (this.state.resultType) {
      var dataFrom = this.state.dataFrom.subtract(1, this.state.resultType)
      var dataTo = this.state.dataTo.subtract(1, this.state.resultType)
      this.setState({
        dataFrom: dataFrom,
        dataTo: dataTo,
      })
    }

  }

  getPeriodToString = () => {

    var result = (this.state.dataFrom.format('L') + ' - ' + this.state.dataTo.format('L'));
    var resultType = null;
    //var qu = moment(this.state.dataFrom).startOf('quarter');
    if (this.state.dataFrom.valueOf() === moment(this.state.dataTo).startOf('day').valueOf()) {
      result = this.state.dataFrom.format('L');
      resultType = 'days';
    }
    else if (moment(this.state.dataFrom).startOf('year').valueOf() === this.state.dataFrom.valueOf() &&
      moment(this.state.dataFrom).endOf('year').valueOf() === this.state.dataTo.valueOf()) {
      result = moment(this.state.dataFrom).year() + ' год';
      resultType = 'years';
    }
    else if (moment(this.state.dataFrom).startOf('month').valueOf() === this.state.dataFrom.valueOf() &&
      moment(this.state.dataFrom).endOf('month').valueOf() === this.state.dataTo.valueOf()) {
      result = this.state.dataFrom.format('MMMM YYYY');
      resultType = 'months';
    }
    else if (moment(this.state.dataFrom).startOf('quarter').valueOf() === this.state.dataFrom.valueOf() &&
      moment(this.state.dataFrom).endOf('quarter').valueOf() === this.state.dataTo.valueOf()) {
      result = this.state.dataFrom.format('Qo') + ' квартал';
      resultType = 'quarters';
    }   //if ()
    console.log(moment(this.state.dataFrom).endOf('month').format())
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


      </div>
    );
  }
}
export default connect(mapStateToProps)(SelectTimePeriod);