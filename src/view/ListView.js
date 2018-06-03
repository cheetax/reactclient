import React, { Component } from 'react';
import { List } from 'react-virtualized'



class ListView extends Component {

    constructor(props) {

        super(props)
        this.state = {
            items_select: props.items.map(item => ({ active: false })),
            items: props.items,
            prevItem: null
        }

        this.rowRenderer = props.rowRenderer;
        this.onSelected = props.onSelected;
        this.onSelectedIndex = props.onSelectedIndex;
        this._rowRenderer = this._rowRenderer.bind(this)
        //this._rowHeight = this._rowHeight.bind(this)
        // this._onClick = this._onClick.bind(this);
    }

    componentWillUpdate(props, prevProps) {
        if (props.items !== prevProps.items) {
            this.rowRenderer = props.rowRenderer;
            this.setState({
                rowHeight: props.rowHeight,
                items: props.items,
                items_select: props.items.map(item => ({ active: false }))
            })

        }
    }

    componentDidMount(e, s, r) {
    }


    _onClick = (key) => {
        var _key = parseInt(key, 10)
        var _items_select = this.state.items_select;
        if (this.state.prevItem != null) _items_select[this.state.prevItem].active = false;
        _items_select[_key].active = true;
        this.setState({
            items_select: _items_select,
            prevItem: _key
        });

        (this.onSelected) ? this.onSelected(this.state.items[_key]) : null;
        (this.onSelectedIndex) ? this.onSelectedIndex(_key) : null;
    }

    _rowHeight = ({ index }) => {
        return this.state.rowHeight ? this.state.rowHeight : 32;
    }

    _className = (index) => {
        return this.state.items_select[index].active ? 'collection-item active' : 'collection-item'
    }

    _rowRenderer = ({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    }) => {
        //var _style = {...style , height: 'auto'};
        return (
            <a
                className={this._className(index)}
                key={key}
                style={style}
                onClick={() => this._onClick(key)}
            >
                {this.rowRenderer({
                    key,         // Unique key within array of rows
                    index,       // Index of row within collection
                    isScrolling, // The List is currently being scrolled
                    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                    style        // Style object to be applied to row (to position it)
                })}
            </a>
        )
    }

    render() {
        return (
            <List
                className={this.props.className}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ width: 'auto', height: '100%', margin: 0, }}
                rowCount={this.state.items.length}
                rowHeight={this._rowHeight}
                rowRenderer={this._rowRenderer}
            />
        )
    }
}

export default ListView;