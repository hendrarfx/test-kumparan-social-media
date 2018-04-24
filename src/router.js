import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
import asyncComponent from './common/hoc/AsyncComponent';
import {connect} from 'react-redux';


const router = (props) => {
    const login=true;
    return (<Switch>
        <PrivateRoute
            exact
            needAuth={!login}
            wrongAuthRedirectPath="/dashboard"
            path="/"
            component={asyncComponent(() => import('./containers/signin/index.js'))}
        />
        <PrivateRoute
            needAuth={login}
            wrongAuthRedirectPath="/"
            path="/dashboard"
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

const PrivateRoute = ({component: Component, needAuth, wrongAuthRedirectPath, ...rest}) => (
    <Route
        {...rest}
        render={props => needAuth
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: wrongAuthRedirectPath
                }}
            />}
    />
);


export default router;