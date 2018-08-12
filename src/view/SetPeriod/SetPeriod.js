import React, { Component } from 'react';
import { connect } from "react-redux";
import Calendar from '../Calendar/CalendarView'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import ImputText from '../InputText/InputText';

import 'react-web-tabs/dist/react-web-tabs.css';
import './SetPeriod.css'

const mapStateToProps = (state) => {
    return {

    };
}

class SetPeriod extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: props.isActive || true,
            dataFrom: props.dataFrom || new Date(),
            dataTo: props.dataTo || new Date(),
            year: (props.dataFrom) ? props.dataFrom.getFullYear() : new Date().getFullYear()
        }
    }

    componentWillMount() {

    }

    componentDidUpdate(prevProps) {

    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value,
        })
    }

    _setDataTo = (data) => {
        console.log(data)
        this.setState({
            dataTo: data
        })
    }

    _setDataFrom = (data) => {
        this.setState({
            dataFrom: data
        })
        console.log(data)
    }

    _selectPeriodWithCalendar = () => {
        const dataFrom = this.state.dataFrom.toLocaleDateString(),
            dataTo = this.state.dataTo.toLocaleDateString()

        return <div className='flex-row' >

            <div className='flex-column' style={{ margin: '5px 0', padding: '0 5px 0 0', borderRight: '1px solid #ddd' }} >
                <div style={{ margin: '5px 0', }} >Начало периода:</div>
                <Calendar data={dataFrom} toClose={false} onSelect={this._setDataFrom} />
            </div>
            <div className='flex-column' style={{ margin: 5, borderRight: 1 }} >
                <div style={{ margin: '5px 0', }}>Конец периода:</div>
                <Calendar data={dataTo} toClose={false} onSelect={this._setDataTo} />
            </div>
        </div>
    }

    _year = () => {
        var { year } = this.state
        return (
            <ImputText/>
            // <div className="input-edit input-field">
            //     <input id="year" value={year} type="text" className="validate" onChange={this.onChange} />
            //     <label htmlFor="phone" className={year ? 'active' : ''}>год</label>
            // </div>
        )
    }

    _selectPeriodWithForm = () => {
        return <form className='edit' >
            {this._year()}
        </form>
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

    _


    render() {
        const isActive = this.state.isActive;
        const dataFrom = this.state.dataFrom.toLocaleDateString(),
            dataTo = this.state.dataTo.toLocaleDateString()
        return (
            <div style={{
                display: (isActive) ? 'block' : 'none'
            }}>
                <div style={{ margin: '5px 0', }}>Установлен период: с {dataFrom} по {dataTo}</div>
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