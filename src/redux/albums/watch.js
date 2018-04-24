import * as saga from './saga';
import * as actionType from './actions';
import {all,takeLatest} from 'redux-saga/effects';

function* watchPosts() {
    yield all([
        takeLatest(actionType.ALBUMS.GET_ALBUM_FROM_SERVER, saga.getAlbumsFromServer),
    ]);

}

export default watchPosts;