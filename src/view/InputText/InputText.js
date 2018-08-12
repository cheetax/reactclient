import React, { Component } from 'react';
import { connect } from "react-redux";
import './InputText.css'

const mapStateToProps = (state) => {
    return {

    };
}

class InputText extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onFocus: false
        }
    }

    componentWillMount() {

    }

    componentDidUpdate(prevProps) {

    }

    _onFocus = (event) => {
        console.log(event)
        var onFocus = this.state.onFocus;
        this.setState({onFocus: !onFocus})
    }


    render() {
        const onFocus = this.state.onFocus;
        return (
            
            <div style={{  }} className={(onFocus) ? "ch-field active" : 'ch-field '} >

                <input type='text' className='ch-input browser-default' onBlur={this._onFocus} onFocus={this._onFocus} />
                <div className={(onFocus) ? 'ch-label active' : 'ch-label'} >Label</div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(InputText);