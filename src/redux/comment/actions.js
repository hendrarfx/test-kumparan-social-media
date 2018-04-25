export const COMMENTS = {
   
    SET_COMMENTS_PER_USER: 'SET_COMMENTS_PER_USER',
    GET_COMMENT_FROM_SERVER: 'GET_COMMENT_FROM_SERVER',
    GET_COMMENT_FROM_SERVER_IN_PROCESS: 'GET_COMMENT_FROM_SERVER_IN_PROCESS',
    SET_ERROR_FOR_GET_COMMENT_FROM_SERVER: 'SET_ERROR_FOR_GET_COMMENT_FROM_SERVER'
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
