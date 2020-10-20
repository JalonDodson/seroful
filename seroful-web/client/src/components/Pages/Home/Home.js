import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import { userState } from "../../../store/store";
import { useRecoilValue } from "recoil";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { homeStyles } from "../../../styles/homeStyles";
import { Typography } from "@material-ui/core";

export const Home = () => {
  const styles = homeStyles();
  const activeUser = useRecoilValue(userState);
  const [randomKittyUrl, setRandomKitty] = useState(null);
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search", {
      method: "GET",
      headers: {
        // don't dock me points on this it's a free api
        "x-api-key": "a81bf42f-4b2d-4858-8557-33c41cd9e8b1",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setRandomKitty(resp[0].url));
  }, []);
  return (
    <>
      <Helmet>
        <title>Seroful - Home</title>
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
          <Typography variant="h3" className={styles.title}>
            You're Home {activeUser && activeUser.displayName}!
          </Typography>
          <hr />
        </header>
        <main styles={{ textAlign: "center" }}>
          <Typography component="h4">What would you like to do?</Typography>
          Also, have a random kitty because I don't know what else to put here, this website was supposed to be for a mobile application:<br />
          {randomKittyUrl && <img src={randomKittyUrl} alt="random kitty" />}
        </main>
        <PageDrawer />
      </div>
    </>
  );
};
