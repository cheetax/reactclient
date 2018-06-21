var newState = {};

export default function login (state = {login: false, user: null}, action) {
    
    switch (action.type) {        
        case 'INITIAL_STATE':
            break;    
        case 'LOGIN':
            newState = action.payload;
            break;
        default:
            newState = state;
            break;
    }
    return newState || state;
}