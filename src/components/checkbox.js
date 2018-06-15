import React, { Component } from 'react';
import './checkbox.scss'

class Checkbox extends Component {
    // static propTypes = {
    //   checked: React.PropTypes.bool,
    //   disabled: React.PropTypes.bool,
    // };
    static defaultProps = {
      checked: false,
      disabled: false,
    };
    constructor(props) {
      super(props);
      this.state = {
        checked: props.checked,
      };
    };
  
    _handleChange = () => {
      this.setState({
        checked: !this.state.checked,
      });
    };
  
    render() {
      const { disabled } = this.props;
      const { checked } = this.state;
      return (
        <div className="React__checkbox">
          <label>
            <input 
              type="checkbox"
              className="React__checkbox--input"
              checked={checked}
              disabled={disabled}
              onChange={this._handleChange}
            />
            <span 
              className="React__checkbox--span"
            />
          </label>
        </div>
      );
    }
  }
  
export default Checkbox;
  