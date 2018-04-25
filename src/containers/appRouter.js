import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../common/hoc/AsyncComponent";

const appRouter = (props) => {

    return (<Switch>
        <Route path={`${props.match.url}`} exact
               component={asyncComponent(() => import('./dashboard/index.js'))}/>
        <Route path={`${props.match.url}/posts`} exact
               component={asyncComponent(() => import('./posts/index.js'))}/>
        <Route path={`${props.match.url}/posts/:id`}
               component={asyncComponent(() => import('./posts/detail/index.js'))}/>
        <Route path={`${props.match.url}/users`} exact
               component={asyncComponent(() => import('./users/index.js'))}/>
        <Route path={`${props.match.url}/users/detail/:id`}
               component={asyncComponent(() => import('./users/detail/index.js'))}/>
        <Route path={`${props.match.url}/users/album`}
               component={asyncComponent(() => import('./photos/index.js'))}/>
        <Redirect to="/404"/>
    </Switch>);
};


export default appRouter;