const NotificationReducer = (state, action) => {
    switch(action.type) {
        case 'READ_ALL': 
            return null;
        case 'READ':
            return null;
        case 'CREATE':
            return null;
        case 'UPDATE':
            return null;
        case 'DELETE': 
            return null;
        default:
            return "Don't have your requirement"

    }
}

export default NotificationReducer;