import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Profile, Home, NotFound } from "../Pages/index";

export const Navigator = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/profile" render={() => <Profile />} />
      <Route path="*" render={() => <NotFound />} />
    </Switch>
  </BrowserRouter>
);
