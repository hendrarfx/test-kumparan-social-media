import * as actionType from './actions';
import {utility} from '../../common/helper';

const initializeState = {
    postData: {},
    gettingDataFromServer: false,
    error: '',
    transactionInProcess: false,
    transactionSuccess: false,
    transactionFailed: false,
    transactionMessage: '',
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.POSTS.SET_ALL_POSTS:
            const newState2 = {...state.postData};
            newState2['all'] = [...action.data];
            return utility(state, {postData: newState2, gettingDataFromServer: false, error: ''});
        case actionType.POSTS.SET_POSTS_PER_USER:

            const newState = {...state.postData};
            newState[action.id] = [...action.data];

            return utility(state, {postData: newState, gettingDataFromServer: false, error: ''});
        case actionType.POSTS.GET_POST_FROM_SERVER_IN_PROCESS:
            return utility(state, {gettingDataFromServer: true, error: ''});
        case actionType.POSTS.SET_ERROR_FOR_GET_POST_FROM_SERVER:
            return utility(state, {gettingDataFromServer: false, error: action.error});
        case actionType.POSTS.POST_TRANSACTION_IN_PROCESS:
            return utility(state, {
                transactionInProcess: false,
                transactionFailed: false,
                transactionSuccess: false,
                transactionMessage: ''
            });
        case actionType.POSTS.POST_TRANSACTION_SUCCESS:
            return utility(state, {
                transactionInProcess: false,
                transactionFailed: false,
                transactionSuccess: true,
                transactionMessage: action.message
            });
        case actionType.POSTS.POST_TRANSACTION_FAILED:
            return utility(state, {
                transactionInProcess: false,
                transactionFailed: true,
                transactionSuccess: false,
                transactionMessage: action.message
            });
        case actionType.POSTS.RESET_POST_TRANSACTION:

            return utility(state, {
                transactionInProcess: false,
                transactionSuccess: false,
                transactionFailed: false,
                transactionMessage: ''
            });
        default:
            return state;
    }
}

export default reducer;