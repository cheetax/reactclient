var newState = [];

export default function users(state = { users: [], newUser: {}, status: false}, action) {
    console.log(action);
    switch (action.type) {          
        case 'INITIAL_STATE':
            break;    
        case 'GET_USERS':
            newState = {...action.payload};
            break;
        default:
            newState = {...state};
            break;
    }

    return newState || state;
}