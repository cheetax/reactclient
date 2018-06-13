var newState = [];

export default function roles(state = {}, action) {
    console.log(action);
    switch (action.type) {          
        case 'INITIAL_STATE':
            break;    
        case 'GET_ROLES':
            newState = {...action.payload.roles};
            break;
        default:
            newState = {...state};
            break;
    }

    return newState || state;
}