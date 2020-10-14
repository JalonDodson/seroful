import React from "react";
import { Helmet } from "react-helmet";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { DataGrid } from "@material-ui/data-grid";
import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { profileStyles } from "../../../styles/profileStyles";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/store";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "goalItem", headerName: "Goal", width: 130 },
  { field: "goalDescription", headerName: "Description", width: 130 },
];

const rows = [
  { id: 1, goalItem: "Example Goal", goalDescription: "Example Description" },
];

export const Profile = (props) => {
  const styles = profileStyles();
  const user = useRecoilValue(userState);
  return (
    <>
      <Helmet>
        <title>Seroful - Profile</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
          <Typography variant="h3" className={styles.title}>
            {user.displayName}'s Profile
          </Typography>
          <hr />
        </header>
        <Card className={styles.root}>
          <CardActionArea className={styles.main}>
            <Avatar className={styles.purple}>
              {user.photoURL ? (
                <img src={user.photoURL} alt={`${user.username}`} />
              ) : user.displayName ? (
                user.displayName[0]
              ) : (
                "S"
              )}
            </Avatar>
            <CardContent className={styles.content}>
              <Typography gutterBottom variant="h5" component="h2">
                {user.displayName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This is my profile page.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <hr />
        <br />
        <div style={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};
