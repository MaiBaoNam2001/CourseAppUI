const UserReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'logout':
            return null;
        default:
            return null;
    }
}

export default UserReducer;