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

const TabsBarView = ({ children, className }) => {
    return (
        <nav className={className} style={{margin: '0px 0px 2px 0px'}} >
            <div className="nav-wrappe flex-container">
                <ul id="nav-mobile" className="flex-menu">
                    <div className='flex-item' >
                        {_element_l(children)}
                    </div>
                    <div className='raw-item'>
                        {_element_r(children)}
                    </div>

                </ul>

            </div>
        </nav>
    )

}

export default TabsBarView;