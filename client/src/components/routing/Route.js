import React from "react";
import { Route, Switch } from "react-router-dom";
import Alerts from '../../components/layouts/Alerts'
import About from '../../components/pages/About'
import Login from '../../components/auth/Login'
import Register from '../../components/auth/Register'
import PrivateRoute from "../routing/PrivateRoute";
import Home from '../../components/pages/Home'

function Routes() {
    return (
        <section className="container">
            <Alerts />
            <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/logout' />
            </Switch>
        </section>
    );
}

export default Routes;