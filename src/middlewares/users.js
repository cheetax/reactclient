const addUser = (action, next) => {
    fetch('http://localhost:3001/users', {
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
                type: 'GET_USERS',
                payload: data
            })
    })

}

const editUser = (action, next) => {
    fetch('http://localhost:3001/users', {
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
                type: 'GET_USERS',
                payload: data
            })
    })

}

const deleteUser = (action, next) => {
    fetch('http://localhost:3001/users', {
        method: 'DELETE',
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
                type: 'GET_USERS',
                payload: data
            })
    })

}

const users = store => next => action => {
    switch (action.type) {
        case 'ADD_USER':
            addUser(action, next)
            break;
        case 'EDIT_USER':
            editUser(action, next)    
            break;
        case 'DELETE_USER':
            deleteUser(action, next)
            break;
        default:
            next(action);
    }
}

export default users;