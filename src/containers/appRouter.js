import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../common/hoc/AsyncComponent";

const appRouter = (props) => {
    return (<Switch>
        <Route path={`${props.match.url}`} exact
               component={asyncComponent(() => import('./dashboard/index.js'))}/>
        <Redirect to="/404"/>
    </Switch>);
};

export default appRouter;