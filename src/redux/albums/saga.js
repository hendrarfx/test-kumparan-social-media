import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../common/config/axios.config';

export function* getAlbumsFromServer(action) {

    try {
        let queryParams = '';
        if (action.params) {
            let params = [];
            for (let key in action.params) {
                params.push(key + '=' + action.params[key]);
            }
            queryParams = '?' + params.join('&');
        }
        yield put(actionType.getAlbumFromServerInProcess());
        const results = yield axios.get('/albums' + queryParams);

        yield put(actionType.setAlbumPerUser(action.id, results.data));
    } catch (error) {
        yield put(actionType.setErrorForGetAlbumFromServer(error.message));
    }

}