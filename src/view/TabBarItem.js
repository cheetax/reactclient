import React from 'react';
import './TabBarItem.css'

const TabBarItem = ({ onClick, children, text, disabled }) => {
    const _onClick = () => {

    }
    return (
        <div >

            {disabled ?
                <div className='disabled' >
                    {children ? children : text}
                </div> :
                <a onClick={onClick}>
                    {children ? children : text}
                </a>}
        </div>
    )
}

export default TabBarItem;