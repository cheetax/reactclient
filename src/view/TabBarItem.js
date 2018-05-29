import React from 'react';

const TabBarItem = ({ onClick, children, text }) => {
    return (
        <li><a onClick={onClick}>{children ? children : text}</a></li>
    )
}

export default TabBarItem;