var initialState = { orders: [], status: false };
var newState = {};

export default function orders(state = initialState, action) {
    console.log(action);
    switch (action.type) {          
        case 'INITIAL_ORDERS':
            newState = initialState; 
            break;   
        case 'SET_FILTER':
        case 'GET_ORDERS':
            newState = {...action.payload};
            break;
        default:
            newState = {...state};
            break;
    }

    return newState ;
}