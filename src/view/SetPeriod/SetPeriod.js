import React, { Component } from 'react';
import { connect } from "react-redux";
import { Calendar } from 'ch-calendar'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { YearField, MonthField, QuarterField, DateField } from 'material-inputfield';

import 'react-web-tabs/dist/react-web-tabs.css';
import './SetPeriod.css';
import 'material-inputfield/dist/material-inputfield.css';

const mapStateToProps = (state) => {
    return {

    };
}

class SetPeriod extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: props.isActive || true,
            dateFrom: props.dataFrom || new Date(),
            dateTo: props.dataTo || new Date(),
            year: (props.dataFrom) ? props.dataFrom.getFullYear() : new Date().getFullYear()
        }
    }

    componentWillMount() {

    }

    componentDidUpdate(prevProps) {

    }

    _onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }

    _onChangeObject = (obj) => {
        this.setState({
            ...obj
        })
    }

    _setDataTo = (date) => {
        this.setState({
            dateTo: date
        })
    }

    _setDataFrom = (date) => {
        this.setState({
            dateFrom: date
        })
    }

    _selectPeriodWithCalendar = () => {
        const dateFrom = this.state.dateFrom.toLocaleDateString(),
            dateTo = this.state.dateTo.toLocaleDateString()

        return <div className='flex-row' >

            <div className='flex-column' style={{ margin: '5px 0', padding: '0 5px 0 0', borderRight: '1px solid #ddd' }} >
                <div style={{ margin: '5px 0', }} >Начало периода:</div>
                <Calendar isActive date={dateFrom} onSelect={this._setDataFrom} />
            </div>
            <div className='flex-column' style={{ margin: 5, borderRight: 1 }} >
                <div style={{ margin: '5px 0', }}>Конец периода:</div>
                <Calendar isActive date={dateTo} onSelect={this._setDataTo} />
            </div>
        </div>
    }

    _year = () => {
        var { year } = this.state
        return (
            <div className='flex-column' >
                <YearField onSpinButtons outlined spinButtons onChange={this._onChange} name='year' type='number' value={year} label='Год' />
                <QuarterField onSpinButtons outlined onChange={this._onChange} name='quarter' value={this.state.dateTo} label='Квартал' />
                <MonthField onSpinButtons onCalendarButton outlined onChange={this._onChange} name='month' value={this.state.dateTo} label='Месяц' />
                <DateField onSpinButtons onCalendarButton outlined onChangeObject={this._onChangeObject} name='date' value={this.state.dateTo} label='Дата' />
            </div>


        )
    }

    _selectPeriodWithForm = () => {
        return <div className='flex-column' >
            {this._year()}
        </div>
    }

    _tabs = () =>
        <Tabs
            defaultTab="one"
            onChange={(tabId) => { console.log(tabId) }}
        >
            <TabList>
                <Tab tabFor="one">Интервал</Tab>
                <Tab tabFor="two">Период</Tab>
                {/* <Tab tabFor="three">Tab 3</Tab> */}
            </TabList>
            <TabPanel tabId="one">
                <div>{this._selectPeriodWithCalendar()}</div>
            </TabPanel>
            <TabPanel tabId="two">
                <div>{this._selectPeriodWithForm()}</div>

            </TabPanel>
            {/* <TabPanel tabId="three">
                <p>Tab 3 content</p>
            </TabPanel> */}
        </Tabs>

    _onAccepted = () => {
        this.setState({ isActive: false })
        if (this.props.onAccepted) this.props.onAccepted({ dataFrom: this.state.dataFrom, dataTo: this.state.dataTo })
    }


    render() {
        const isActive = this.state.isActive;
        const dateFrom = this.state.dateFrom.toLocaleDateString(),
            dateTo = this.state.dateTo.toLocaleDateString()
        return (
            <div style={{
                display: (isActive) ? 'block' : 'none',
                width: 496
            }}>
                <div style={{ margin: '5px 0', }}>Установлен период: с {dateFrom} по {dateTo}</div>
                {this._tabs()}
                <div style={{ justifyContent: 'flex-end' }} className='flex-row' >
                    <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => this.setState({ isActive: false })} >Закрыть</a>
                    <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={this._onAccepted} >Принять</a>

                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(SetPeriod);