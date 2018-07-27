import React, { Component, ReactDOM } from 'react';
//import StyleSheet  from 'react-style'
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
            prevItem: -1,
            height: 0,
            width: 0,
            elem: null,
            readHeader: true,
            columnWidth: [],
            header: []
        }
        this.headerRenderer = props.headerRenderer;
        this._headerRenderer = this._headerRenderer.bind(this);
        this.rowRenderer = props.rowRenderer;
        this.onSelected = props.onSelected;
        this.onSelectedIndex = props.onSelectedIndex;
        this._rowRenderer = this._rowRenderer.bind(this)
        this.resize = this.resize.bind(this);

        //this._rowHeight = this._rowHeight.bind(this)
        // this._onClick = this._onClick.bind(this);
    }

    _getRowHeight = (elemRow) => {
        console.log('1')
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
                    columnWidth: [],
                    columnHeigth: [],
                    readHeader: true,
                })
                this._setHeader();
            })
        }
    }

    resize = () => this._getElem(this.state.elem)

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    _getElem = (elem) => {
        if (elem) {
            var elemHeight = elem.clientHeight;
            var elemWidth = elem.clientWidth;
            this.setState({
                height: elemHeight,
                width: elemWidth,
                elem: elem
            })
        }
    }

    _getElemRowColumns = (elem, index) => {
        if (elem) {
            var columnHeigth = this.state.columnHeigth;
            var columnWidth = this.state.columnWidth;
            columnWidth[index] = elem.clientWidth
            columnHeigth[index] = elem.clientHeight
            // this.setState({
            //     columnWidth: columnWidth,
            //     columnHeigth: columnHeigth
            // })
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

    _rowHeight = ({ index }) => this.state.rowHeight ? this.state.rowHeight : 32;

    _className = (index) => this.state.items_select[index].active ? 'collection-item active' : 'collection-item'

    _rowRendererElem = (param) => {
        var rowColumns = this.rowRenderer(param)
        if (!Array.isArray(rowColumns)) rowColumns = [rowColumns];

        return (
            <div style={{ display: 'flex', }} >
                {rowColumns.map((item, index) => <span key={index}>{item}</span>)}
            </div>
        )
    }

    _rowRenderer = (param) => {
        //var _style = {...style , height: 'auto'};
        var { key, style, index } = param;
        return (
            <a
                className={this._className(index)}
                key={key}
                style={style}
                onClick={() => this._onClick(key)}
            >
                {this._rowRendererElem(param)}
            </a>
        )
    }

    _setHeader = () => {
        var style = {
            width: 'auto',
            height: 'auto',
            margin: 0,
            padding: 20,
        }
        var param = {
            style
        }
        var columnWidth = [];
        var headerColumns = this.headerRenderer(param)
        if (!Array.isArray(headerColumns)) headerColumns = [headerColumns]
        
        var e = headerColumns.map((item, index) => {
            columnWidth[index] = item.width || 40;
            var style = {
                width: columnWidth[index],
            }
            return (<span key={index} style={style} >{item} </span>)
        })
        this.setState({
            columnWidth: columnWidth,
            header: < div style={{ display: 'flex' }} >{e}</div >
        })
    }

    _headerRenderer = () => this.state.header

    render() {
        return (
            <div style={{ width: 'auto', height: '100%', margin: 0, border: '1px solid #e0e0e0', borderRadius: '2px' }}>
                {this._headerRenderer()}
                <div
                    style={{ width: 'auto', height: '100%', margin: 0, }}
                    ref={this._getElem}>
                    <List
                        className={this.props.className}
                        width={this.state.width}
                        height={this.state.height}
                        style={{ width: 'auto', height: '100%', margin: 0, }}
                        rowCount={this.state.items.length}
                        rowHeight={this._rowHeight}
                        rowRenderer={this._rowRenderer}
                        scrollToIndex={this.state.setSelectedIndex}
                    />
                </div>
            </div>



        )
    }
}

export default ListView;