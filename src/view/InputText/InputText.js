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
            onFocus: false,
            label: null,
        }
    }

    componentWillMount() {

    }

    componentDidUpdate(prevProps) {

    }

    componentDidMount(e) {
        console.log(e)
    }

    _onFocus = (event) => {
        console.log(event)
        var onFocus = this.state.onFocus;
        this.setState({ onFocus: !onFocus })
    }

    _ref = (element) => {
        console.log(element)
        this.setState({ label: element })
    }


    render() {
        const onFocus = this.state.onFocus;
        if (!this.props.type) {
            return (

                <div style={{}} className={(onFocus) ? "ch-field active" : 'ch-field '} >
                    <input type='text' className='ch-input browser-default' onBlur={this._onFocus} onFocus={this._onFocus} />
                    <div ref={this._ref} className={(onFocus) ? 'ch-label active' : 'ch-label'} >Label</div>
                </div>
            );
        }
        else {
            return (
                <div style={{}} className={(onFocus) ? "ch-field-type active" : 'ch-field-type '} >
                    <input type='text' className='ch-input-type browser-default' onBlur={this._onFocus} onFocus={this._onFocus} />
                    <div ref={this._ref} className={(onFocus) ? 'ch-label-type active' : 'ch-label-type'} >Label1</div>
                </div>
            );
        }
    }
}
export default connect(mapStateToProps)(InputText);