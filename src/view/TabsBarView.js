import React from 'react';
import './TabsBarView.css'
//import { MDCTabBar, MDCTab } from '@material/tabs'

const _element_l = (items) => {
    if (!Array.isArray(items)) items = [...items]
    return items.map(item => !item.props.right ? item : null )
   
}

const _element_r = (items) => {
    if (!Array.isArray(items)) items = [...items]
    return items.map(item => item.props.right ? item : null)    
}

const TabsBarView = ({ children }) => {
    return (
        <nav>
            <div className="nav-wrappe flex-container">
                <ul id="nav-mobile" className="left hide-on-med-and-down flex-menu">
                    <div className='flex-item' >
                        {_element_l(children)}
                    </div>
                    <div className='raw-item'>
                        {_element_r(children)}
                        {/* <li ><a href="collapsible.html">Login</a></li> */}
                    </div>

                </ul>

            </div>
        </nav>
    )

}

export default TabsBarView;