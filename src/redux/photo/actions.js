export const POSTS = {
    SET_ALL_POSTS: 'SET_USERS',
    SET_POSTS_PER_USER: 'SET_POSTS_PER_USER',
    GET_POST_FROM_SERVER: 'GET_POST_FROM_SERVER',
    GET_POST_FROM_SERVER_IN_PROCESS: 'GET_POST_FROM_SERVER_IN_PROCESS',
    SET_ERROR_FOR_GET_POST_FROM_SERVER: 'SET_ERROR_FOR_GET_POST_FROM_SERVER'
};

export const setAllPost = (object) => {
    return {
        type: POSTS.SET_ALL_POSTS,
        data: object
    }
};

export const setPostPerUser = (id,object) => {
    return {
        type: POSTS.SET_POSTS_PER_USER,
        data: object,
        id:id
    }
};

export const getPostFromServer = (params) => {
    return {
        type: POSTS.GET_POST_FROM_SERVER,
        params:params
    }
};


export const getPostFromServerInProcess = () => {
    return {
        type: POSTS.GET_POST_FROM_SERVER_IN_PROCESS
    }
};


export const setErrorForGetPostFromServer = (error) => {
    return {
        type: POSTS.SET_ERROR_FOR_GET_POST_FROM_SERVER,
        error:error
    }
};
