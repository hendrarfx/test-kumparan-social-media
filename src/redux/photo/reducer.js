import * as actionType from './actions';
import {utility} from '../../common/helper';

const initializeState = {
    photo: {},
    gettingDataFromServer: false,
    error: ''
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.PHOTOS.SET_PHOTOS_PER_USER:
            const newState = {
                ...state.photo
            };
            newState[action.id] = [...action.data];
            return utility(state, {photo: newState, gettingDataFromServer: false, error: ''});
        case actionType.PHOTOS.GET_PHOTO_FROM_SERVER:
            return utility(state, {gettingDataFromServer: true, error: ''});
        case actionType.PHOTOS.SET_ERROR_FOR_GET_PHOTO_FROM_SERVER:
            return utility(state, {gettingDataFromServer: false, error: action.error});
        default:
            return state;
    }
}

export default reducer;