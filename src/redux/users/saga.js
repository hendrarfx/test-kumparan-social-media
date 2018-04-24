import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getUsersFromServer(action) {
    try{
        yield put(actionType.getUserFromServerInProcess());
        const results=yield axios.get('/users');
        yield put(actionType.setUsers(results.data));
    } catch (error){
        yield put(actionType.setErrorForGetUserFromServer(error.message));
    }
}