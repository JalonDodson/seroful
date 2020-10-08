import React from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { journalStyles } from "../../../styles/journalStyles";
import { userState } from '../../../store/store';

export const Journal = () => {
  // const styles = journalStyles();
  return (
    <>
      <Helmet>
        <title>Seroful - Journal</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.container}>
        <header className={styles.header} >
          <hr />
          <h1>{userState.displayName}'s Journal Entries</h1>
          <hr />
        </header>
      </div>
    </>
  );
};
