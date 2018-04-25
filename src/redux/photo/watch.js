import * as saga from './saga';
import * as actionType from './actions';
import {all, takeEvery} from 'redux-saga/effects';

function* watchPosts() {
    yield all([
        takeEvery(actionType.PHOTOS.GET_PHOTO_FROM_SERVER, saga.getPhotoFromServer),
    ]);
}

export default watchPosts;