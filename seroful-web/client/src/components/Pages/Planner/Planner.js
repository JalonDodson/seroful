import React from "react";
import { Helmet } from "react-helmet";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { plannerStyles } from "../../../styles/plannerStyles";

export const Planner = (props) => {
  const styles = plannerStyles();
  return (
    <>
      <Helmet>
        <title> Seroful - User's Production Planner</title>
      </Helmet>
      <PageDrawer />
      <h1>something here</h1>
    </>
  );
};
