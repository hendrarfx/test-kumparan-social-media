import * as actionType from './actions';
import {utility} from '../../common/helper';

const initializeState = {
    message: '',
    open: false
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.SNACK_BAR.OPEN_SNACK_BAR:
            return utility(state, {message: action.message, open: true});
        case actionType.SNACK_BAR.CLOSE_SNACK_BAR:
            return utility(state, {message: '', open: false});
        default:
            return state;
    }
}

export default reducer;