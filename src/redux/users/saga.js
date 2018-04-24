import {put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import * as actionType from './actions';
import fireBase from '../../common/firebase.config';
import fireBaseDefault from 'firebase';

export function* logout(action) {
    yield fireBase.auth().signOut();
    yield localStorage.removeItem('token');
    yield put(actionType.logoutSuccess());
}

export function* checkOutTimeOut(action) {
    yield delay(action.expirationTime);
    yield put(actionType.logoutSuccess());
}

export function* register(action) {
    yield put(actionType.setAuthInProcess());
    const authData = {
        email: action.user.email,
        password: action.user.password,
        returnSecureToken: true
    };
    try {
        yield fireBase.auth().setPersistence(fireBaseDefault.auth.Auth.Persistence.SESSION);
        try {
            yield fireBase.auth().createUserWithEmailAndPassword(authData.email, authData.password);
            try {
                yield fireBase.auth().currentUser.updateProfile({displayName: action.user.name});

                try {
                    const user = fireBase.auth().currentUser;
                    const profile = {
                        userId: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        token: user.refreshToken
                    };
                    yield fireBase.database().ref('contacts').push().set(profile);

                    const expires = yield (new Date().getTime() + (3600 * 1000));
                    const object = {
                        id: profile.userId,
                        expires: expires
                    };
                    yield localStorage.setItem('token', JSON.stringify(object));
                   // yield put(actionType.checkAuthTimeout(3600 * 1000));
                    yield put(actionType.setUser(profile));
                } catch (error) {
                    yield put(actionType.setError(error.message));
                }
            } catch (error) {
                yield put(actionType.setError(error.message));
            }
        } catch (error) {
            yield put(actionType.setError(error.message));
        }
    } catch (error) {
        yield put(actionType.setError(error.message));
    }
}

export function* login(action) {
    yield put(actionType.setAuthInProcess());

    try {
        yield fireBase.auth().setPersistence(fireBaseDefault.auth.Auth.Persistence.SESSION);
        try {
            yield fireBase.auth().signInWithEmailAndPassword(action.user.email, action.user.password);
            const user = fireBase.auth().currentUser;

            if (user != null) {

                const profile = {
                    userId: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    token: user.refreshToken
                };

                const expires = yield (new Date().getTime() + (3600 * 1000));
                const object = {
                    id: profile.userId,
                    expires: expires
                };
                yield localStorage.setItem('token', JSON.stringify(object));
               // yield put(actionType.checkAuthTimeout(3600 * 1000));
                yield put(actionType.setUser(profile));
            } else {
                yield put(actionType.setError('Authentication Failed'));
            }
        } catch (error) {

            yield put(actionType.setError(error.message));
        }
    } catch (error) {

        yield put(actionType.setError(error.message));
    }
}

export function* checkAuthFromLocalStorage() {
    yield put(actionType.checkStateFromLocalStorageInProcess());
    const tokens = yield localStorage.getItem('token');
    if (tokens !== undefined && tokens !== null && tokens !== '') {
        const objToken = JSON.parse(tokens);
        const now = new Date().getTime();
        const expires = objToken.expires - now;

        if (expires > 0) {
            //yield put(actionType.checkAuthTimeout(expires));
            yield put(actionType.fireBaseOnAuthStateChanged());
        } else {
            yield put(actionType.logout());
            yield put(actionType.checkStateFromLocalStorageDone());
        }
    } else {
        yield put(actionType.logout());
        yield put(actionType.checkStateFromLocalStorageDone());
    }
}