import React from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { homeStyles } from "../../../styles/homeStyles";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Seroful - Home</title>
      </Helmet>
      <PageDrawer />
    </>
  );
};
