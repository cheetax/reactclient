import React, { Component } from 'react';
import { List } from 'react-virtualized'



class ListView extends Component {

    constructor(props) {

        super(props)
        this.state = {
            items_select: props.items.map((item, index) => ({ active: (props.setSelectedIndex == index) })),
            items: props.items,
            setSelectedIndex: props.setSelectedIndex,
            prevItem: null
        }

        this.rowRenderer = props.rowRenderer;
        this.onSelected = props.onSelected;
        this.onSelectedIndex = props.onSelectedIndex;
        this._rowRenderer = this._rowRenderer.bind(this)
        //this._rowHeight = this._rowHeight.bind(this)
        // this._onClick = this._onClick.bind(this);
    }

    getIndex = (items1, items2) => new Promise((resolve, project) => {
        var index = (() => {
            if (items1.length != items2.length && items2.length != 0) {
                if (items1.length < items2.length) {
                    var _items = items1.map(item => JSON.stringify(item));
                    var _itemsPrev = items2;
                }
                else if (items1.length > items2.length) {
                    var _items = items2.map(item => JSON.stringify(item));
                    var _itemsPrev = items1;
                }
                return _itemsPrev.findIndex((itemFind) => {
                    var i = _items.indexOf(JSON.stringify(itemFind))
                    if (i != -1) {
                        _items.splice(i, 1)
                        return false;
                    }
                    else return true
                });
            }
            else return -1;
        })()
        resolve(index)
    })

    componentWillUpdate(props, prevProps) {
        // if (props.items !== prevProps.items || props.setSelectedIndex !== prevProps.setSelectedIndex) {
        if (props.items !== prevProps.items) {
            this.getIndex(props.items, prevProps.items).then((index) => {
                index = props.items.length == index ? index - 1 : index;
                this.rowRenderer = props.rowRenderer;
                this.setState({
                    rowHeight: props.rowHeight,
                    items: props.items,
                    items_select: props.items.map((item, i) => ({ active: (i == index) })),
                    setSelectedIndex: index,
                })
            })
            // ((items1, items2) => {                
            // var i = await this.getIndex(items1, items2)
            // return i;
            // if (props.items.length != prevProps.items.length && prevProps.items.length != 0) {
            //     if (props.items.length < prevProps.items.length) {
            //         var _items = props.items.map(item => JSON.stringify(item));
            //         var _itemsPrev = prevProps.items;
            //     }
            //     else if (props.items.length > prevProps.items.length) {
            //         var _items = prevProps.items.map(item => JSON.stringify(item));
            //         var _itemsPrev = props.items;
            //     }
            //     return _itemsPrev.findIndex((itemFind) => {
            //         var i = _items.indexOf(JSON.stringify(itemFind))
            //         if (i != -1) {
            //             _items.splice(i, 1)
            //             return false;
            //         }
            //         else return true
            //     });
            // }
            // else return -1;
            // })(props.items, prevProps.items)       

        }
    }

    componentDidMount(e, s, r) {
    }


    _onClick = (key) => {
        var _key = parseInt(key, 10)
        var _items_select = this.state.items_select;
        if (this.state.prevItem != null && this.state.prevItem < _items_select.length) _items_select[this.state.prevItem].active = false;
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