import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getCommentsFromServer(action) {
    try {
        let queryParams = '';
        if (action.params !== null) {
            let params = [];
            for (let key in action.params) {
                params.push(key + '=' + action.params[key]);
            }
            queryParams = '?' + params.join('&');
        }

        yield put(actionType.getCommentFromServerInProcess());
        const results = yield axios.get('/comments' + queryParams);
        yield put(actionType.setCommentPerUser(action.id, results.data));
    } catch (error) {
        yield put(actionType.setErrorForGetCommentFromServer(error.message));
    }
}


export function* saveCommentToServer(action) {
    try {

        yield put(actionType.commentTransactionInProcess());
        const results = yield axios.post('/comments', action.comment);

        if (results.status === 201) {
            const filter = {postId: action.comment.postId}
            yield put(actionType.getCommentFromServer(filter, action.comment.postId))
            yield put(actionType.commentTransactionSuccess('Comment has been saved'));
        } else {
            yield put(actionType.commentTransactionFailed('Save failed'));
        }
    } catch (error) {
        yield put(actionType.commentTransactionFailed(error.message));
    }
}

export function* updateCommentToServer(action) {
    try {

        yield put(actionType.commentTransactionInProcess());
        const results = yield axios.put('/comments/' + action.comment.id, action.comment);

        if (results.status === 200) {
            const filter = {postId: action.comment.postId}
            yield put(actionType.getCommentFromServer(filter, action.comment.postId))
            yield put(actionType.commentTransactionSuccess('Comment has been updated'));
        } else {
            yield put(actionType.commentTransactionInProcess('Update failed'));
        }
    } catch (error) {
        yield put(actionType.commentTransactionFailed(error.message));
    }
}

export function* deleteCommentFromServer(action) {
    try {

        yield put(actionType.commentTransactionInProcess());
        const results = yield axios.delete('/comments/' + action.comment.id);

        if (results.status === 200) {
            const filter = {postId: action.comment.postId}
            yield put(actionType.getCommentFromServer(filter, action.comment.postId))
            yield put(actionType.commentTransactionSuccess('Comment has been deleted'));
        } else {
            yield put(actionType.commentTransactionFailed('Delete failed'));
        }
    } catch (error) {
        yield put(actionType.commentTransactionFailed(error.message));
    }
}