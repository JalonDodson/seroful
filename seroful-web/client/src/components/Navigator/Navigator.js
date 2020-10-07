import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, NotFound, Planner, Profile } from "../Pages/index";

export const Navigator = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      // TODO: Make route for profile /users/(username or uid)/profile
      <Route path="/profile" render={() => <Profile />} />
      // TODO: Make route for planner /users/(username or uid)/planner
      <Route path="/planner" render={() => <Planner />} />
      <Route path="*" render={() => <NotFound />} />
    </Switch>
  </BrowserRouter>
);
