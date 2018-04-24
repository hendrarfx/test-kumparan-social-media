import * as saga from './saga';
import * as actionType from './actions';
import {all,takeEvery} from 'redux-saga/effects';

function* watchPosts() {
    yield all([
        takeEvery(actionType.POSTS.GET_POST_FROM_SERVER, saga.getPostFromServer),
    ]);

}

export default watchPosts;