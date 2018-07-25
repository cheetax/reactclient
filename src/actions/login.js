export const setLogin = () => (dispatch) => {
    if (!localStorage['useAccount']) {
        localStorage.key = 'useAccount';
        localStorage['useAccount'] = false;
    }
    if (JSON.parse(localStorage['useAccount'])) {
        dispatch(getLoginAccount())
    }
    else {
        if (!document.cookie) {
            console.log(window.location)
            window.document.location = 'http://localhost:3001/login';
            dispatch({
                type: 'NEW_PAGE',
                payload: -1
            })
        }
        else dispatch(getLogin());

    }
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

export const getLoginAccount = () => (dispatch) => {
    var account = { login: 'dmitriy.grebenev@gmail.com', password: '1234' };
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
            if (data.status) {
                localStorage.key = 'useAccount'
                localStorage['useAccount'] = true;
            }
            dispatch({
                type: 'LOGIN',
                payload: data
            })
            dispatch({
                type: 'NEW_PAGE',
                payload: data.status ? null : -1
            })

        })

}

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
            localStorage['useAccount'] = false;
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



