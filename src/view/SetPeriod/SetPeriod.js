import React, { Component } from 'react';
import { connect } from "react-redux";
import Calendar from '../Calendar/CalendarView'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

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

        }
    }

    componentWillMount() {

    }

    componentDidUpdate(prevProps) {

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

    _selectPeriod = () => {
        const dataFrom = this.state.dataFrom.toLocaleDateString(),
            dataTo = this.state.dataTo.toLocaleDateString()

        return <div className='flex-row' >

            <div className='flex-column' style={{margin: '5px 0', padding: '0 5px 0 0', borderRight: '1px solid #ddd'}} >
                <div style={{margin: '5px 0', }} >Начало периода:</div>
                <Calendar data={dataFrom} toClose={false} onSelect={this._setDataFrom} />
            </div>
            <div className='flex-column' style={{margin: 5, borderRight: 1}} >
            <div style={{margin: '5px 0', }}>Конец периода:</div>
                <Calendar data={dataTo} toClose={false} onSelect={this._setDataTo} />
            </div>
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
                <div>{this._selectPeriod()}</div>
            </TabPanel>
            <TabPanel tabId="two">
                <p>Tab 2 content</p>
            </TabPanel>
            {/* <TabPanel tabId="three">
                <p>Tab 3 content</p>
            </TabPanel> */}
        </Tabs>


    render() {
        const isActive = this.state.isActive;
        const dataFrom = this.state.dataFrom.toLocaleDateString(),
        dataTo = this.state.dataTo.toLocaleDateString()
        return (
            <div style={{
                display: (isActive) ? 'block' : 'none'
            }}>
                <div style={{margin: '5px 0', }}>Установлен период: с {dataFrom} по {dataTo}</div>
                {this._tabs()}
            </div>
        );
    }
}
export default connect(mapStateToProps)(SetPeriod);