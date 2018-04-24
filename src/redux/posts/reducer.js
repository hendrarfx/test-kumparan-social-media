import * as actionType from './actions';
import {utility} from '../../common/helper';

const initializeState = {
    users: [],
    gettingDataFromServer:false,
    error:''
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.USERS.SET_USERS:
            return utility(state, {users: action.users,gettingDataFromServer:false,error:''});
        case actionType.USERS.GET_USER_FROM_SERVER_IN_PROCESS:
            return utility(state, {gettingDataFromServer: true,error:''});
        case actionType.USERS.SET_ERROR_FOR_GET_USER_FROM_SERVER:
            return utility(state, {gettingDataFromServer: false,error:action.error});
        default:
            return state;
    }
}

export default reducer;