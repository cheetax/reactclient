import React, { Component } from 'react';
import './TabsBarView.css'
//import { MDCTabBar, MDCTab } from '@material/tabs'



class TabsBarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: -1
        }
    }

    _onClick = (index) => {
        var i = index;
        if (this.state.selectedItem !== index) {
            this.setState({
                selectedItem: index
            })
        }
        else {
            this.setState({
                selectedItem: -1,
            })
            i = null;
        }
        if (this.props.onSelectedIndex) this.props.onSelectedIndex(i)

        // console.log(event.target.currentTarget)
    }



    _element_l = (items) => {
        if (!items) return null
        if (!Array.isArray(items) && items) items = [items]
        return items.map((item, index) => {
            return !item.props.right ?
                <li key={index} onClick={() => this._onClick(item.key)} className={
                    !item.props.disabled ? this.state.selectedItem === item.key ? 'active-bar-item' : '' : 'disabled'
                } >{item}</li> : null || null
        })

    }

    _element_r = (items) => {
        if (!items) return null
        if (!Array.isArray(items)) items = [items]
        return items.map(item => item.props.right ? <div onClick={() => this._onClick(item.key)} className={this.state.selectedItem === item.key ? 'active-bar-item' : ''} >{item}</div> : null)
    }

    render() {
        return (
            <nav className={this.props.className} style={{ margin: '0px 0px 2px 0px' }} >
                <div className="nav-wrappe flex-container">
                    <ul id="nav-mobile" className="flex-menu">
                        <ul className='left-item' >
                            {this._element_l(this.props.children)}
                        </ul>
                        <div className='right-item'>
                            {this._element_r(this.props.children)}
                        </div>

                    </ul>

                </div>
            </nav>
        )
    }

}

export default TabsBarView;