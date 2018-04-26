import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getPostFromServer(action) {
    try {
        let queryParams = '';
        if (action.params !== null) {
            let params = [];
            for (let key in action.params) {
                params.push(key + '=' + action.params[key]);
            }
            queryParams = '?' + params.join('&');
        }
        yield put(actionType.getPostFromServerInProcess());
        const results = yield axios.get('/posts' + queryParams);
        yield put(actionType.setPostPerUser(action.id, results.data));
    } catch (error) {
        yield put(actionType.setErrorForGetPostFromServer(error.message));
    }
}

export function* savePostToServer(action) {
    try {
        yield put(actionType.postTransactionInProcess());
        const results = yield axios.post('/posts', action.post);
        if (results.status === 201) {
            const filter = {userId: action.post.userId}
            yield put(actionType.getPostFromServer(filter, action.post.userId))
            yield put(actionType.postTransactionSuccess('Post has been saved'));
        } else {
            yield put(actionType.postTransactionFailed('Save failed'));
        }
    } catch (error) {
        yield put(actionType.postTransactionFailed(error.message));
    }
}

export function* updatePostToServer(action) {
    try {

        yield put(actionType.postTransactionInProcess());
        const results = yield axios.put('/posts/' + action.post.id, action.post);

        if (results.status === 200) {
            const filter = {userId: action.post.userId}
            yield put(actionType.getPostFromServer(filter, action.post.userId));
            yield put(actionType.getPostFromServer(null, 'all'));
            yield put(actionType.postTransactionSuccess('Post has been updated'));
        } else {
            yield put(actionType.postTransactionFailed('Update failed'));
        }
    } catch (error) {
        yield put(actionType.postTransactionFailed(error.message));
    }
}

export function* deletePostFromServer(action) {
    try {
        yield put(actionType.postTransactionInProcess());
        const results = yield axios.delete('/posts/' + action.post.id);

        if (results.status === 200) {
            const filter = {userId: action.post.userId}
            yield put(actionType.getPostFromServer(filter, action.post.userId))
            yield put(actionType.postTransactionSuccess('Post has been deleted'));
        } else {
            yield put(actionType.postTransactionFailed('Delete failed'));
        }
    } catch (error) {
        yield put(actionType.postTransactionFailed(error.message));
    }
}
