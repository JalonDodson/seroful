import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Profile, Home } from "../Pages/index";

export const Navigator = (props) => (
    <BrowserRouter>
        <Switch>
            <Route path="/" render={() => <Home />}/>
        </Switch>
    </BrowserRouter>
)