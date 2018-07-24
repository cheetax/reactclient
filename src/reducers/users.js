var initialState = { users: [], newUser: {}, status: false };
var newState = {};

export default function users(state = initialState, action) {
    console.log(action);
    switch (action.type) {          
        case 'INITIAL_USERS':
            newState = initialState; 
            break;    
        case 'GET_USERS':
            newState = {...action.payload};
            break;
        default:
            newState = {...state};
            break;
    }

    return newState ;
}