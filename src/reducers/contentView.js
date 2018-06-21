var newState = -1;

export default function contentView (state = null, action) {
    
    switch (action.type) {        
        case 'NEW_PAGE':
            newState = action.payload;
            break;
        default:
            newState = state;
            break;
    }
    return newState ;
}