import * as actionType from './actions';
import {utility} from '../../common/helper';

const initializeState = {
    postData: {
        all:[]
    },
    gettingDataFromServer:false,
    error:''
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.POSTS.SET_ALL_POSTS:
            return utility(state, {postData: {all:action.data},gettingDataFromServer:false,error:''});
        case actionType.POSTS.SET_POSTS_PER_USER:
            const newState={
                all:[...state.data.all]
            };
            newState[action.id]=action.data;
            return utility(state, {postData: newState,gettingDataFromServer:false,error:''});
        case actionType.POSTS.GET_USER_FROM_SERVER_IN_PROCESS:
            return utility(state, {gettingDataFromServer: true,error:''});
        case actionType.POSTS.SET_ERROR_FOR_GET_USER_FROM_SERVER:
            return utility(state, {gettingDataFromServer: false,error:action.error});
        default:
            return state;
    }
}

export default reducer;