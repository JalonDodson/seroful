import React from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { settingsStyles } from "../../../styles/settingsStyles";

export const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Seroful - Settings</title>
      </Helmet>
      <PageDrawer />
    </>
  );
};
