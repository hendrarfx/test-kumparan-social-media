import * as saga from './saga';
import * as actionType from './actions';
import {all,takeEvery} from 'redux-saga/effects';

function* watchUsers() {
    yield all([
        takeEvery(actionType.USERS.GET_USER_FROM_SERVER, saga.getUsersFromServer),
    ]);

}

export default watchUsers;