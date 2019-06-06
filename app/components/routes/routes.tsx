import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Authentication, Main, NotFound } from "components";
import { Dashboard, Accounts, Jobs, Users, Health } from "modules";

export class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/authentication" />
                    </Route>
                    <Main path="/authentication" component={Authentication} checkAuthentication={false} />
                    <Main path="/dashboard" component={Dashboard} checkAuthentication={true} />
                    <Main path="/accounts" component={Accounts} checkAuthentication={true} />
                    <Main path="/jobs" component={Jobs} checkAuthentication={true} />
                    <Main path="/users" component={Users} checkAuthentication={true} />
                    <Main path="/health" component={Health} checkAuthentication={true} />
                    <Main path="*" component={NotFound} checkAuthentication={false} />
                </Switch>
            </Router>
        )
    }
}