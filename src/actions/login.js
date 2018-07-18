export const setLogin = () => (dispath) => {
    console.log(window.location)
    window.document.location = 'http://localhost:3001/login';
    dispath({
        type: 'NEW_PAGE',
        payload: -1
    })
};

export const getLogin = (account) => (dispatch) => {
    if (account === undefined) account = {};
    fetch('http://localhost:3001/login',
        {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(account),
            headers: {
                'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            dispatch({
                type: 'LOGIN',
                payload: data
            })

            dispatch({
                type: 'NEW_PAGE',
                payload: data.status ? null : -1
            })
            
        })
};

export const getLogout = () => (dispatch) => {
    fetch('http://localhost:3001/logout',
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            dispatch({
                type: 'LOGOUT',
                payload: data
            })

            dispatch({
                type: 'NEW_PAGE',
                payload: data.status ? null : -1
            })
            
        })
};



