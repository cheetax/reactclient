import React, { Component } from 'react';
import { List } from 'react-virtualized'



class ListView extends Component {

    constructor(props) {

        super(props)
        var setSelectedIndex = -1;
        if (props.setSelectedIndex) setSelectedIndex = props.setSelectedIndex
        this.state = {
            rowHeight: props.rowHeight,
            items_select: props.items.map((item, index) => ({ active: (setSelectedIndex === index) })),
            items: props.items,
            setSelectedIndex: setSelectedIndex,
            prevItem: -1
        }
        this.rowRenderer = props.rowRenderer;
        this.onSelected = props.onSelected;
        this.onSelectedIndex = props.onSelectedIndex;
        this._rowRenderer = this._rowRenderer.bind(this)
        //this._rowHeight = this._rowHeight.bind(this)
        // this._onClick = this._onClick.bind(this);
    }

    getIndexAsync = async (items1, items2) => await new Promise(async (resolve) => {
        resolve(await (async () => {
            var i = -1;
            var _itemsSearch = [...items1];
            var _itemsElements = [...items2];
            if (items1.length !== items2.length && items2.length !== 0) {
                if (items1.length > items2.length) {
                    _itemsSearch = [...items2];
                    _itemsElements = [...items1];
                }
                var i_end = _itemsElements.length;
                for (i = (i_end / 2 | 0); i_end - i > 1 && i > 1;) {

                    if (JSON.stringify(_itemsElements[i]) === JSON.stringify(_itemsSearch[i])) {
                        i = i + ((i_end - i) / 2 | 0);
                    }
                    else {
                        i_end = i;
                        i = (i / 2 | 0);
                    }
                }
            }

            _itemsSearch = _itemsSearch.splice(i - 1, i_end + 1).map(item => JSON.stringify(item));
            _itemsElements = _itemsElements.splice(i - 1, i_end + 1);

            i = i - 1 + _itemsElements.findIndex(item => !_itemsSearch.includes(JSON.stringify(item)));
            return i < 0 ? -1 : i;
        })())
    })

    componentWillUpdate(props, prevProps) {
        if (props.items !== prevProps.items) {
            this.getIndexAsync(props.items, prevProps.items).then((index) => {
                if (index === -1) index = this.state.prevItem;
                index = props.items.length === index ? index - 1 : index;
                this.rowRenderer = props.rowRenderer;
                this.setState({
                    rowHeight: props.rowHeight,
                    items: props.items,
                    items_select: props.items.map((item, i) => ({ active: (i === index) })),
                    setSelectedIndex: index,
                    prevItem: index,
                })

            })
        }
    }

    _onClick = (key) => {
        var _key = parseInt(key, 10)
        var _items_select = this.state.items_select;
        if (this.state.prevItem !== -1 && this.state.prevItem < _items_select.length) _items_select[this.state.prevItem].active = false;
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