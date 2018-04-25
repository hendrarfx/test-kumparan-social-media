import * as actionType from './actions';
import {utility} from '../../common/helper';

const initializeState = {
    comments: {},
    gettingDataFromServer: false,
    error: ''
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.COMMENTS.SET_COMMENTS_PER_USER:
            const newState = {
                ...state.comments
            };
            newState[action.id] = [...action.data];
            return utility(state, {comments: newState, gettingDataFromServer: false, error: ''});
        case actionType.COMMENTS.GET_COMMENT_FROM_SERVER_IN_PROCESS:
            return utility(state, {gettingDataFromServer: true, error: ''});
        case actionType.COMMENTS.SET_ERROR_FOR_GET_COMMENT_FROM_SERVER:
            return utility(state, {gettingDataFromServer: false, error: action.error});
        default:
            return state;
    }
}

export default reducer;