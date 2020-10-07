import React from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { journalStyles } from "../../../styles/journalStyles";

export const Journal = () => {
  return (
    <>
      <Helmet>
        <title>Seroful - Journal</title>
      </Helmet>
      <PageDrawer />
    </>
  );
};
