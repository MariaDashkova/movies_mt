import React, {Component} from 'react';
// import {Router, Route} from 'react-router-dom';
import LoginPage from "../LoginPage/loginPage";
import RegisterPage from "../RegisterPage/index";
import {Route, Switch} from 'react-router'
import Customer from "../Customers";

import ActorHome from "../Customers/actor/actorHome";
import Analyst from "../Customers/analyst/analyst";

import StudioHome from "../Customers/studio/studioHome";
import Studio from "../Customers/studio/studio";

import Actor from "../Customers/actor/actor";
import AnalystHome from "../Customers/analyst/analystHome";
import Test from "../Customers/studio/test";


class App extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path = "/customer" component={Customer}/>

                <Route path = "/actor" component={ActorHome}/>
                <Route path = "/actorPage" component={Actor}/>

                <Route path = "/analyst" component={AnalystHome}/>
                <Route path="/analystPage" component={Analyst}/>

                <Route path="/studio" component={StudioHome}/>
                <Route path="/studioPage" component={Studio}/>

                <Route path="/test" component={Test}/>

            </Switch>
        );
    }
}

export default App;
