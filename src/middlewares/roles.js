const getRoles = (action, next) => {
    fetch('http://localhost:3001/roles', {
        method: 'GET',
        credentials: 'include',
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
                type: action.type,
                payload: data
            })
    })
}

const users = store => next => action => {
    switch (action.type) {
        case 'GET_ROLES':
            getRoles(action, next)
            break;
        default:
            next(action);
    }
}

export default users;