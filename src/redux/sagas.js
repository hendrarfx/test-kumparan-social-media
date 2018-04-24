import {all, fork} from 'redux-saga/effects';
import watchAuth from './auth/watch';
import watchChat from './chat/watch';
import watchContacts from './contacts/watch';

export function* watchSaga() {
    yield all([
        fork(watchAuth),
        fork(watchChat),
        fork(watchContacts)
    ]);
}