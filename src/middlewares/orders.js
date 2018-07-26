const addOrder = (action, next) => {
    fetch('http://localhost:3001/orders', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(action.payload),
        //mode: 'no-cors',
        headers: {
            'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        next(
            {
                type: 'GET_ORDERS',
                payload: data
            })
    })

}

const editOrder = (action, next) => {
    fetch('http://localhost:3001/orders', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(action.payload),
        //mode: 'no-cors',
        headers: {
            'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        next(
            {
                type: 'GET_ORDERS',
                payload: data
            })
    })

}

const deleteOrder = (action, next) => {
    fetch('http://localhost:3001/orders', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(action.payload),
        headers: {
            'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        next(
            {
                type: 'GET_ORDERS',
                payload: data
            })
    })

}

const getOrders = (action, next) => {
    fetch('http://localhost:3001/orders', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        next({ type: 'GET_ORDERS', payload: data })
    })
}

const getOrdersFilter = (action, next) => {
    fetch('http://localhost:3001/orders/filter', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(action.payload),
        headers: {
            'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        next({ type: 'SET_FILTER', payload: data })
    })
}

const orders = store => next => action => {
    switch (action.type) {
        case 'ADD_ORDER':
            addOrder(action, next)
            break;
        case 'EDIT_ORDER':
            editOrder(action, next)
            break;
        case 'DELETE_ORDER':
            deleteOrder(action, next)
            break;
        case 'GET_ORDERS':
            getOrders(action, next)
            break;
        case 'SET_FILTER':
            getOrdersFilter(action, next)
            break;
        default:
            next(action);
    }
}

export default orders;