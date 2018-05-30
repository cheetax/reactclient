import React, { Component } from 'react';
import { List } from 'react-virtualized'



const ListView = ({ users }) => {
    const rowRenderer = ({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    }) => {
        return (
            <a
                className="collection-item"
                key={key}
                style={style}
                href='#!'
            >
                {users[index].name}
            </a>
        )
    }
    return (
        <List
            className='collection'
            width={500}
            height={300}
            rowCount={users.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
        />
    )
}

export default ListView;