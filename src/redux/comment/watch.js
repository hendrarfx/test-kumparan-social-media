import * as saga from './saga';
import * as actionType from './actions';
import {all,takeEvery} from 'redux-saga/effects';

function* watchComments() {
    yield all([
        takeEvery(actionType.COMMENTS.GET_COMMENT_FROM_SERVER, saga.getCommentsFromServer),
    ]);

}

export default watchComments;