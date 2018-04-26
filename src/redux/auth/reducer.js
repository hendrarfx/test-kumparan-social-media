import * as actionType from './actions';
import {utility} from '../../common/helper/';

const initializeState = {
    user: {},
    inProcess: false,
    error: false,
    errorMessage: '',
    login: false,
    timeout: false,
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.AUTH.SET_USER:
            const newState = {
                user: {...action.user},
                error: false,
                errorMessage: '',
                inProcess: false,
                login: true
            };
            return utility(state, newState);
        case actionType.AUTH.AUTH_FAIL:
            return utility(state, {error: true, errorMessage: action.error, inProcess: false});
        case actionType.AUTH.SET_AUTH_IN_PROCESS:
            return utility(state, {error: false, inProcess: true, errorMessage: ''});
        case actionType.AUTH.AUTH_SIGN_OUT:
            return utility(state, initializeState);
        case actionType.AUTH.AUTH_TIME_OUT:
            return utility(state, {timeout: true});
        case actionType.AUTH.AUTH_RESET_ERROR:
            return utility(state, {error: false, errorMessage: ''});
        default:
            return state;
    }
}



export default reducer;