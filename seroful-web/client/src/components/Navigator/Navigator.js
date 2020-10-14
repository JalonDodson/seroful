import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Home,
  Profile,
  Friends,
  Planner,
  Journal,
  Settings,
  NotFound,
  Splash,
  VideoChat
} from "../Pages/index";

import { newUser } from "../../store/store";
import { useRecoilValue } from "recoil";
export const Navigator = () => {
  const userNew = useRecoilValue(newUser);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (userNew ? <Splash /> : <Home />)}
        />
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/friends" render={() => <Friends />} />
        <Route path="/video" render={() => <VideoChat />} />
        <Route path="/planner" render={() => <Planner />} />
        <Route path="/journal" render={() => <Journal />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};
