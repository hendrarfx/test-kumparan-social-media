import * as saga from './saga';
import * as actionType from './actions';
import {all,takeEvery,takeLatest} from 'redux-saga/effects';

function* watchComments() {
    yield all([
        takeEvery(actionType.COMMENTS.GET_COMMENT_FROM_SERVER, saga.getCommentsFromServer),
        takeLatest(actionType.COMMENTS.SAVE_COMMENTS_TO_SERVER, saga.saveCommentToServer),
        takeLatest(actionType.COMMENTS.UPDATE_COMMENTS_TO_SERVER, saga.updateCommentToServer),
        takeLatest(actionType.COMMENTS.DELETE_COMMENTS_FROM_SERVER, saga.deleteCommentFromServer),
    ]);

}

export default watchComments;