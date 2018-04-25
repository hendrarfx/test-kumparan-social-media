import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getPhotoFromServer(action) {
    try {
        let queryParams = '';
        if (action.params) {
            let params = [];
            for (let key in action.params) {
                params.push(key + '=' + action.params[key]);
            }
            queryParams = '?' + params.join('&');
        }

        yield put(actionType.getPhotoFromServerInProcess());
        const results = yield axios.get('/photos' + queryParams);
        yield put(actionType.setPhotoPerUser(action.id,results.data));
    } catch (error) {
        yield put(actionType.setErrorForGetPhotoFromServer(error.message));
    }
}