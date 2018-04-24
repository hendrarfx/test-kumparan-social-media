import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getPostFromServer(action) {
    try{
        yield put(actionType.getPostFromServerInProcess());
        const results=yield axios.get('/posts');
        yield put(actionType.setAllPost(results.data));
    } catch (error){
        yield put(actionType.setErrorForGetPostFromServer(error.message));
    }
}