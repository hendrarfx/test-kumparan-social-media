import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import {watchSaga as rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();
const isChrome = !!window.chrome;

const middlewares = [thunk, sagaMiddleware];
const composeEnhancers = (process.env.NODE_ENV === 'development' && isChrome) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const store = createStore(
    combineReducers({
        ...reducers
    }),
    composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export {store};
