export const setLogin = () => {
    console.log(window.location)
    window.document.location = 'http://localhost:3001/login';
};

export const getLogin = () => dispatch => {
    fetch('http://localhost:3001/login',
        {
            method: 'POST',
            credentials: 'include',
        }).then(res => {
            return res.json()
        }).then(data => {
            dispatch({
                type: 'LOGIN',
                payload: data.status
            })
        })
};