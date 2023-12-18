const NotificationReducer = (state, action) => {
    switch(action.type) {
        case 'READ_ALL': 
            return state.filter(noti => noti?.userId === action.id);
        case 'CREATE':
            return [...state, action.friendRequest];
        case 'UPDATE':
            return null;
        case 'DELETE': 
            return state.filter(friendRequest => friendRequest.requestedUserId !== action.id);
        case 'SET_DEPEND_ON_USER_ID':
            return state.filter(friendRequest => friendRequest.userId === action.id);
        case 'SET':
            return action.friendRequests
        default:
            return "Don't have your requirement"

    }
}

export default NotificationReducer;