import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getCommentsFromServer(action) {
    try {
        let queryParams = '';
        if (action.params!==null) {
            let params = [];
            for (let key in action.params) {
                params.push(key + '=' + action.params[key]);
            }
            queryParams = '?' + params.join('&');
        }

        yield put(actionType.getCommentFromServerInProcess());
        const results = yield axios.get('/comments' + queryParams);
        yield put(actionType.setCommentPerUser(action.id,results.data));
    } catch (error) {
        yield put(actionType.setErrorForGetCommentFromServer(error.message));
    }
}