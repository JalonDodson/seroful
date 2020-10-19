import React from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { friendsStyles } from "../../../styles/friendsStyles";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/store";
import * as api from "../../../util/api";

export const Friends = () => {
    const styles = friendsStyles();
    const user = useRecoilValue(userState);
    
  return (
    <>
      <Helmet>
        <title>Seroful - {user.displayName}'s Friends</title>
      </Helmet>
      <PageDrawer />
    </>
  );
};
