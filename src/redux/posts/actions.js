export const POSTS = {
    SET_ALL_POSTS: 'SET_ALL_POSTS',
    SET_POSTS_PER_USER: 'SET_POSTS_PER_USER',
    GET_POST_FROM_SERVER: 'GET_POST_FROM_SERVER',
    GET_POST_FROM_SERVER_IN_PROCESS: 'GET_POST_FROM_SERVER_IN_PROCESS',
    SET_ERROR_FOR_GET_POST_FROM_SERVER: 'SET_ERROR_FOR_GET_POST_FROM_SERVER',

    SAVE_POST_TO_SERVER: 'SAVE_POST_TO_SERVER',
    UPDATE_POST_TO_SERVER: 'UPDATE_POST_TO_SERVER',
    DELETE_POST_FROM_SERVER: 'DELETE_POST_FROM_SERVER',

    POST_TRANSACTION_IN_PROCESS: 'POST_TRANSACTION_IN_PROCESS',
    POST_TRANSACTION_SUCCESS: 'POST_TRANSACTION_SUCCESS',
    POST_TRANSACTION_FAILED: 'POST_TRANSACTION_FAILED',
    RESET_POST_TRANSACTION: 'RESET_POST_TRANSACTION',
};

export const setAllPost = (object) => {
    return {
        type: POSTS.SET_ALL_POSTS,
        data: object
    }
};

export const setPostPerUser = (id, object) => {
    return {
        type: POSTS.SET_POSTS_PER_USER,
        data: object,
        id: id
    }
};

export const getPostFromServer = (params, id) => {
    return {
        type: POSTS.GET_POST_FROM_SERVER,
        params: params,
        id: id
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
        error: error
    }
};


export const savePostToServer = (post) => {
    return {
        type: POSTS.SAVE_POST_TO_SERVER,
        post: post
    }
};

export const updatePostToServer = (post) => {
    return {
        type: POSTS.UPDATE_POST_TO_SERVER,
        post: post
    }
};

export const deletePostFromServer = (post) => {
    return {
        type: POSTS.DELETE_POST_FROM_SERVER,
        post: post
    }
};

export const postTransactionInProcess = () => {
    return {
        type: POSTS.POST_TRANSACTION_IN_PROCESS,
    }
};

export const postTransactionSuccess = (message) => {
    return {
        type: POSTS.POST_TRANSACTION_SUCCESS,
        message: message
    }
};


export const postTransactionFailed = (message) => {
    return {
        type: POSTS.POST_TRANSACTION_FAILED,
        message: message
    }
};

export const resetPostTransaction = () => {
    return {
        type: POSTS.RESET_POST_TRANSACTION
    }
};
