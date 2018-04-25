import * as actionType from './actions';
import {utility} from '../../common/helper';

const initializeState = {
    albums: {},
    gettingDataFromServer: false,
    error: ''
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.ALBUMS.SET_ALL_ALBUMS:
            return utility(state, {albums: {...state.albums}, gettingDataFromServer: false, error: ''});
        case actionType.ALBUMS.SET_ALBUMS_PER_USER:

            const newState = {...state.albums};
            newState[action.id] = [...action.data];

            return utility(state, {albums: newState, gettingDataFromServer: false, error: ''});
        case actionType.ALBUMS.GET_ALBUM_FROM_SERVER_IN_PROCESS:
            return utility(state, {gettingDataFromServer: true, error: ''});
        case actionType.ALBUMS.SET_ERROR_FOR_GET_ALBUM_FROM_SERVER:
            return utility(state, {gettingDataFromServer: false, error: action.error});
        default:
            return state;
    }
}

export default reducer;