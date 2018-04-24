export const ALBUMS = {
    SET_ALL_ALBUMS: 'SET_USERS',
    SET_ALBUMS_PER_USER: 'SET_ALBUMS_PER_USER',
    GET_ALBUM_FROM_SERVER: 'GET_ALBUM_FROM_SERVER',
    GET_ALBUM_FROM_SERVER_IN_PROCESS: 'GET_ALBUM_FROM_SERVER_IN_PROCESS',
    SET_ERROR_FOR_GET_ALBUM_FROM_SERVER: 'SET_ERROR_FOR_GET_ALBUM_FROM_SERVER'
};

export const setAllAlbum = (object) => {
    return {
        type: ALBUMS.SET_ALL_ALBUMS,
        data: object
    }
};

export const setAlbumPerUser = (id,object) => {
    return {
        type: ALBUMS.SET_ALBUMS_PER_USER,
        data: object,
        id:id
    }
};

export const getAlbumFromServer = (params,id) => {
    return {
        type: ALBUMS.GET_ALBUM_FROM_SERVER,
        params:params,
        id:id
    }
};


export const getAlbumFromServerInProcess = () => {
    return {
        type: ALBUMS.GET_ALBUM_FROM_SERVER_IN_PROCESS
    }
};


export const setErrorForGetAlbumFromServer = (error) => {
    return {
        type: ALBUMS.SET_ERROR_FOR_GET_ALBUM_FROM_SERVER,
        error:error
    }
};
