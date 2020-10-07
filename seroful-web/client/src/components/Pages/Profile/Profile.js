import { StylesContext } from "@material-ui/styles";
import React from "react";
import { Helmet } from "react-helmet";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { profileStyles } from "../../../styles/profileStyles";
import { Avatar } from "@material-ui/core";

export const Profile = (props) => {
  const styles = profileStyles();

  return (
    <>
      <Helmet>
        <title> Seroful - User's Profile</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.main}>
        <Avatar alt="placeholder" className={styles.avatar}>JD</Avatar>
      </div>
    </>
  );
};
