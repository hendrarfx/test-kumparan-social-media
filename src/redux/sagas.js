import {all, fork} from 'redux-saga/effects';
import watchUsers from './users/watch';
import watchPosts from './posts/watch';
import watchAlbums from './albums/watch';
import watchPhoto from './photo/watch';
import watchComments from './comment/watch';
import watchAuth from './auth/watch';

export function* watchSaga() {
    yield all([
        fork(watchUsers),
        fork(watchPosts),
        fork(watchAlbums),
        fork(watchPhoto),
        fork(watchComments),
        fork(watchAuth)
    ]);
}