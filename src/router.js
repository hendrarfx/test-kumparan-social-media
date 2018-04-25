import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
import asyncComponent from './common/hoc/AsyncComponent';
import {connect} from 'react-redux';

const router = (props) => {
    const login=props.isLogin;
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
        <PrivateRoute
            needAuth={login}
            wrongAuthRedirectPath="/"
            path="/signout"
            component={asyncComponent(() => import('./containers/signout/index.js'))}
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


const mapStateToProps=(state)=>{
    return{
        isLogin:state.rAuth.login
    }
}

export default withRouter(connect(mapStateToProps)(router));