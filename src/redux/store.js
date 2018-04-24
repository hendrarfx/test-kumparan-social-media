import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import {watchSaga as rootSaga} from './sagas';
import firekitReducers from 'firekit';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware];
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
//const composeEnhancers = compose;

const store = createStore(
    combineReducers({
        ...reducers,
        ...firekitReducers,
        router: routerReducer
    }),
    composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export {store, history};
