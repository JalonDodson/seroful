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
<<<<<<< HEAD
  /> 
        {/* // TODO: Make route for profile /users/(username or uid)/profile */}
=======
        />
>>>>>>> d1cc2c766914fa750f3e9ce376422bdde0f266df
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
