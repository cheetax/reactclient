import React, { Component } from 'react';
import { List } from 'react-virtualized'



class ListView extends Component() {

    _users = this.props.users.map(user => ({ ...user, active: false }))
    _prevItem = null;

    _onClick = (event) => {
        console.log('onClick')
        if (this._prevItem) this._users[this._prevItem].active = false;;
        this._users[parseInt(event._targetInst.key)].active = true;
        this._prevItem = parseInt(event._targetInst.key);
        // _target = event.currentTarget;
    }

    _className = (index) => {
        return this._users[index].active ? 'collection-item active' : 'collection-item'
    }
    rowRenderer = ({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    }) => {
        return (
            <a
                className={this._className(index)}
                key={key}
                style={style}
                onClick={this._onClick}
            >
                {this._users[index].name}
            </a>
        )
    }
    render() {
        return (
            <List
                className='collection light-blue darken-1'
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ width: 'auto', height: 'auto', margin: 0, }}
                rowCount={this._users.length}
                rowHeight={48}
                rowRenderer={this.rowRenderer}
            />
        )
    }
}

export default ListView;