export const COMMENTS = {
   
    SET_COMMENTS_PER_USER: 'SET_COMMENTS_PER_USER',
    GET_COMMENT_FROM_SERVER: 'GET_COMMENT_FROM_SERVER',
    GET_COMMENT_FROM_SERVER_IN_PROCESS: 'GET_COMMENT_FROM_SERVER_IN_PROCESS',
    SET_ERROR_FOR_GET_COMMENT_FROM_SERVER: 'SET_ERROR_FOR_GET_COMMENT_FROM_SERVER',

    SAVE_COMMENTS_TO_SERVER: 'SAVE_COMMENTS_TO_SERVER',
    UPDATE_COMMENTS_TO_SERVER: 'UPDATE_COMMENTS_TO_SERVER',
    DELETE_COMMENTS_FROM_SERVER: 'DELETE_COMMENTS_FROM_SERVER',

    COMMENTS_TRANSACTION_IN_PROCESS: 'COMMENTS_TRANSACTION_IN_PROCESS',
    COMMENTS_TRANSACTION_SUCCESS: 'COMMENTS_TRANSACTION_SUCCESS',
    COMMENTS_TRANSACTION_FAILED: 'COMMENTS_TRANSACTION_FAILED'
    
};


export const setCommentPerUser = (id,object) => {
    return {
        type: COMMENTS.SET_COMMENTS_PER_USER,
        data: object,
        id:id
    }
};

export const getCommentFromServer = (params,id) => {
    return {
        type: COMMENTS.GET_COMMENT_FROM_SERVER,
        params:params,
        id:id
    }
};


export const getCommentFromServerInProcess = () => {
    return {
        type: COMMENTS.GET_COMMENT_FROM_SERVER_IN_PROCESS
    }
};


export const setErrorForGetCommentFromServer = (error) => {
    return {
        type: COMMENTS.SET_ERROR_FOR_GET_COMMENT_FROM_SERVER,
        error:error
    }
};


export const saveCommentToServer = (comment) => {
    return {
        type: COMMENTS.SAVE_COMMENTS_TO_SERVER,
        comment: comment
    }
};

export const updateCommentToServer = (comment) => {
    return {
        type: COMMENTS.UPDATE_COMMENTS_TO_SERVER,
        comment: comment
    }
};

export const deleteCommentFromServer = (comment) => {
    return {
        type: COMMENTS.DELETE_COMMENTS_FROM_SERVER,
        comment: comment
    }
};

export const commentTransactionInProcess = () => {
    return {
        type: COMMENTS.COMMENTS_TRANSACTION_IN_PROCESS,
    }
};

export const commentTransactionSuccess = (message) => {
    return {
        type: COMMENTS.COMMENTS_TRANSACTION_SUCCESS,
        message: message
    }
};


export const commentTransactionFailed = (message) => {
    return {
        type: COMMENTS.COMMENTS_TRANSACTION_FAILED,
        message: message
    }
};