export const USERS = {
    SET_USERS: 'SET_USERS',
    GET_USER_FROM_SERVER: 'GET_USER_FROM_SERVER',
    GET_USER_FROM_SERVER_IN_PROCESS: 'GET_USER_FROM_SERVER_IN_PROCESS',
    SET_ERROR_FOR_GET_USER_FROM_SERVER: 'SET_ERROR_FOR_GET_USER_FROM_SERVER'
};

export const setUsers = (object) => {
    return {
        type: USERS.SET_USERS,
        users: object
    }
};

export const getUserFromServer = () => {
    return {
        type: USERS.GET_USER_FROM_SERVER
    }
};


export const getUserFromServerInProcess = () => {
    return {
        type: USERS.GET_USER_FROM_SERVER_IN_PROCESS
    }
};


export const setErrorForGetUserFromServer = (error) => {
    return {
        type: USERS.SET_ERROR_FOR_GET_USER_FROM_SERVER,
        error:error
    }
};
