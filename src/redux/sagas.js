import {all, fork} from 'redux-saga/effects';
import watchUsers from './users/watch';
import watchPosts from './posts/watch';
import watchAlbums from './albums/watch';

export function* watchSaga() {
    yield all([
        fork(watchUsers),
        fork(watchPosts),
        fork(watchAlbums)
    ]);
}