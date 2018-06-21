export const setLogin = () => (dispath) => {
    console.log(window.location)
    window.document.location = 'http://localhost:3001/login';
};

export const getLogin = (account) => (dispatch) => {
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
                payload: data.status
            })
            if (data.status) {
                dispatch({
                    type: 'NEW_PAGE',
                    payload: null
                })
            }
        })
};