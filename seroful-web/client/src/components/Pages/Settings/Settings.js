import React from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { settingsStyles } from "../../../styles/settingsStyles";
import Typography from '@material-ui/core/Typography';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../../store/store";

export const Settings = () => {
  const styles = settingsStyles();
  const [user, setUser] = useRecoilState(userState);
  return (
    <>
      <Helmet>
        <title>Seroful - Settings</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
          <Typography variant="h3" className={styles.title}>
            {user.displayName}'s Settings
          </Typography>
          <hr />
        </header>
        <form method='PATCH' action='/users'>
          
        </form>
      </div>
    </>
  );
};
