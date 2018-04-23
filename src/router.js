import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
import asyncComponent from './common/hoc/AsyncComponent';
import {connect} from 'react-redux';


const router = (props) => {
    return (<Switch>
        <Route
            exact
            path="/"
            component={asyncComponent(() => import('./containers/home/index.js'))}
        />
        <Route
            exact
            path="/404"
            component={asyncComponent(() => import('./components/commonPage/404Error.js'))}>
        </Route>

        <Redirect to="/404"/>

    </Switch>);
}

const CustomRoute = ({component: Component, isLoggedIn, redirectPath, ...rest}) => (
    <Route
        {...rest}
        render={props => isLoggedIn
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: redirectPath
                }}
            />}
    />
);


export default router;