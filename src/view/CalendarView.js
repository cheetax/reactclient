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

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      monthArray: Array(7, 6),
      data: moment(props.data),
    }
  }

  componentWillMount() {
    var monthArray = Array(...Array(7));
    for (var week = 0; week <= 5; week++) {
      for (var day = 0; day <= 6; day++) {
        console.log(moment(this.state.data).day((week * 7) + (day + 1)).format('L'))
        monthArray[day][week] = moment(this.state.data).day((week * 7) + (day + 1)).format('L')
        console.log(monthArray);
      }
    }
    
  }

  componentDidUpdate(prevProps) {

  }


  render() {

    return (
      <div className="flex-row">
        Календарь
      </div>
    );
  }
}
//export default connect(mapStateToProps)(LoginPage);
export default Calendar;