
export const getUsers = () => (dispatch) => {
    fetch('http://localhost:3001/users', {
        method: 'POST',
        credentials: 'include',
        //mode: 'no-cors',
        headers: {
            'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        //dispatch({ type: 'GET_USERS', payload: 'users' });
        //console.log()
        return res.json()
    }).then((users) => {
            dispatch({ type: 'GET_USERS', payload: users })
            console.log(users);
        })
}