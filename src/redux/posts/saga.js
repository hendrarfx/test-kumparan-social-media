import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getPostFromServer(action) {
    try{
        console.log('DISPATCH LAGI');
        let queryParams = '';
        if (action.params!==null) {
            let params = [];
            for (let key in action.params) {
                params.push(key + '=' + action.params[key]);
            }
            queryParams = '?' + params.join('&');
        }
        yield put(actionType.getPostFromServerInProcess());
        const results=yield axios.get('/posts'+queryParams);
        yield put(actionType.setPostPerUser(action.id,results.data));
    } catch (error){
        yield put(actionType.setErrorForGetPostFromServer(error.message));
    }
}

export function* savePostToServer(action) {
    try{
        yield put(actionType.postTransactionInProcess());
        const results=yield axios.post('/posts',action.post);
        console.log('SAGA_SAVE',results);
        const filter={userId:action.post.userId}
        yield put(actionType.getPostFromServer(filter,action.post.userId))
        yield put(actionType.postTransactionSuccess('Post had been saved'));
    } catch (error){
        yield put(actionType.postTransactionFailed(error.message));
    }
}