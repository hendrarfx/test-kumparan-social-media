import {put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* logout(action) {
    yield localStorage.removeItem('token');
    yield put(actionType.logoutSuccess());
}

export function* checkOutTimeOut(action) {
    yield delay(action.expirationTime);
    yield put(actionType.logoutSuccess());
}

export function* login(action) {
    yield put(actionType.setAuthInProcess());

    try {
        const response = yield axios.get('/users?username='+action.user.username);
        if(response.data.length > 0){
            if(action.user.password==='admin'){
                const expires = yield (new Date().getTime() + (7200 * 1000));
                const user=response.data[0];
                const object = {
                    id: user.id,
                    expires: expires
                };

                yield localStorage.setItem('token', JSON.stringify(object));
                yield put(actionType.setUser(user));
                yield put(actionType.checkAuthTimeout(7200 * 1000));

            } else{
                yield put(actionType.setError('Password is not match'));
            }
        } else {
            yield put(actionType.setError('Username not found'));
        }
    } catch (error) {
        yield put(actionType.setError(error.message));
    }
}

export function* checkAuthFromLocalStorage() {
    const tokens = yield localStorage.getItem('token');
    if (tokens !== undefined && tokens !== null && tokens !== '') {
        const objToken = JSON.parse(tokens);
        const now = new Date().getTime();
        const expires = objToken.expires - now;
        if (expires > 0) {
            try{
                const response = yield axios.get('/users?id='+objToken.id);

                if(response.data.length > 0){
                    yield put(actionType.setUser(response.data[0]));
                    yield put(actionType.checkAuthTimeout(expires));
                } else {
                    yield put(actionType.logout());
                }
            } catch (error){
                yield put(actionType.logout());
            }
        } else {
            yield put(actionType.logout());
        }
    } else {
        yield put(actionType.logout());
    }
}