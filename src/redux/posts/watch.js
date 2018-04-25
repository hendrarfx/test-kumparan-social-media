import * as saga from './saga';
import * as actionType from './actions';
import {all,takeEvery,takeLatest} from 'redux-saga/effects';

function* watchPosts() {
    yield all([
        takeEvery(actionType.POSTS.GET_POST_FROM_SERVER, saga.getPostFromServer),
        takeLatest(actionType.POSTS.SAVE_POST_TO_SERVER, saga.savePostToServer),
    ]);

}

export default watchPosts;