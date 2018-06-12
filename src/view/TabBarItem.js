import React from 'react';
import './TabBarItem.css'

const TabBarItem = ({ onClick, children, text, disabled }) => {
    const _onClick = () => {

    }
    return (
        <li >

            {disabled ?
                <div className='disabled' >
                    {children ? children : text}
                </div> :
                <a onClick={onClick}>
                    {children ? children : text}
                </a>}
        </li>
    )
}

export default TabBarItem;