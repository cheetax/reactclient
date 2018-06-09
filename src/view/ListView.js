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


    getIndexAsync = async (items1, items2) => await new Promise(async (resolve) => {
        resolve(await (async () => {
            console.log(new Date().getMilliseconds())
            var index = -1;
            var i = 0;
            if (items1.length != items2.length && items2.length != 0) {
                if (items1.length < items2.length) {
                    //var _itemsSearch = items1.map(item => JSON.stringify(item));
                    var _itemsSearch = [...items1];
                    var _itemsElements = [...items2];
                }
                else if (items1.length > items2.length) {
                    //var _itemsSearch = items2.map(item => JSON.stringify(item));
                    var _itemsSearch = [...items2];
                    var _itemsElements = [...items1];
                }
               
                for (var i = (_itemsElements.length / 2 | 0) ; _itemsElements.length - i > 1 && i > 1  ; ) {

                    if (JSON.stringify(_itemsElements[i]) === JSON.stringify(_itemsSearch[i])) {
                        // _itemsSearch.splice(0, i);
                        // _itemsElements.splice(0, i);
                        i = i + ((_itemsElements.length - i) / 2 | 0);
                    }
                    else {
                        // _itemsSearch.splice(i + 1, _itemsSearch.length - i)
                        // _itemsElements.splice(i+1, _itemsElements.length - i)
                        i = (i / 2 | 0)
                    }

                }              
                // _itemsSearch = _itemsSearch.map(item => JSON.stringify(item))
                // index = _itemsElements.findIndex((itemFind) => {
                //     var i = _itemsSearch.indexOf(JSON.stringify(itemFind));
                //     if (i != -1) {
                //         _itemsSearch.splice(i, 1);
                //         return false;
                //     }
                //     else return true;
                // });

            }
            console.log(new Date().getMilliseconds())
            return i;
        })())
    })

    componentWillUpdate(props, prevProps) {
        if (props.items !== prevProps.items) {
            this.getIndexAsync(props.items, prevProps.items).then((index) => {
                index = props.items.length == index ? index - 1 : index;
                this.rowRenderer = props.rowRenderer;
                this.setState({
                    rowHeight: props.rowHeight,
                    items: props.items,
                    items_select: props.items.map((item, i) => ({ active: (i == index) })),
                    setSelectedIndex: index,
                })
            })
        }
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