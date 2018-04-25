export const PHOTOS = {
    SET_PHOTOS_PER_USER: 'SET_PHOTOS_PER_USER',
    GET_PHOTO_FROM_SERVER: 'GET_PHOTO_FROM_SERVER',
    GET_PHOTO_FROM_SERVER_IN_PROCESS: 'GET_PHOTO_FROM_SERVER_IN_PROCESS',
    SET_ERROR_FOR_GET_PHOTO_FROM_SERVER: 'SET_ERROR_FOR_GET_PHOTO_FROM_SERVER'
};

export const setPhotoPerUser = (id,object) => {
    return {
        type: PHOTOS.SET_PHOTOS_PER_USER,
        data: object,
        id:id
    }
};

export const getPhotoFromServer = (params,id) => {
    return {
        type: PHOTOS.GET_PHOTO_FROM_SERVER,
        params:params,
        id:id
    }
};


export const getPhotoFromServerInProcess = () => {
    return {
        type: PHOTOS.GET_PHOTO_FROM_SERVER_IN_PROCESS
    }
};


export const setErrorForGetPhotoFromServer = (error) => {
    return {
        type: PHOTOS.SET_ERROR_FOR_GET_PHOTO_FROM_SERVER,
        error:error
    }
};
