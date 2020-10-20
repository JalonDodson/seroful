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
import { getQuote } from "../../../util/api";
import { List, ListItem } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "goalItem", headerName: "Goal", width: 130 },
];

const quote = () => {
  const quote = [];
  getQuote().then((resp) => {
    quote.push(resp.contents.quotes[0].quote);
  });
  return quote;
};
const whatever = quote();
export const Profile = (props) => {
  const styles = profileStyles();
  const user = useRecoilValue(userState);
  let todaysGoals =
    user.goals &&
    user.goals.filter((g) => {
      const goalDate = `${new Date(g.date).toString().split(" ")[1]} ${
        new Date(g.date).toString().split(" ")[2]
      }`;
      const date = Date.now();
      const todaysDate = `${new Date(date).toString().split(" ")[1]} ${
        new Date(date).toString().split(" ")[2]
      }`;

      console.log(goalDate, todaysDate);
      return goalDate === todaysDate;
    });
  // console.log(todaysGoals);
  // const rows = todaysGoals
  //   ? todaysGoals &&
  //     todaysGoals[todaysGoals.length - 1].goals.map((x, i) => {
  //       console.log(x);
  //       const type = ["first", "second", "third"];
  //       return {
  //         id: i,
  //         goalItem: x[type[i]],
  //       };
  //     })
  //   : {
  //       id: 0,
  //       goalItem: "N/A",
  //     };
  // console.log(rows);
  // const goals = user.goals && user.goals;
  // user.goals returns an array of objects, each object contains 3 goals (nested object of 3 strings) and a date in which the goals were made
  return (
    <>
      <Helmet>
        <title>Seroful - {user.username}'s Profile</title>
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
          <Typography variant="h2" className={styles.title}>
            {user.displayName}
          </Typography>
          <hr />
        </header>
        <Card className={styles.card}>
          {user && user.photoURL ? (
            <Avatar src={user.photoURL} alt={`${user.username}`} />
          ) : (
            <Avatar>{user.displayName[0]}</Avatar>
          )}
          <CardContent className={styles.content}>
            <Typography gutterBottom variant="h4">
              {user.displayName}
            </Typography>
            <Typography variant="h6"> Quote of the Day: </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {whatever}
            </Typography>
          </CardContent>
        </Card>
        <hr />
        <br />
        <div
          style={{
            margin: "auto",
            float: "right",
            height: "70%",
            width: "35%",
            backgroundColor: "#fff",
          }}
        >
          <List>
            {todaysGoals[0].goals.map((x, i) => {
              const type = ["first", "second", "third"];
              return (
                <ListItem key={i}>
                  ID: {i + 1} --- Goal: {x[type[i]]}
                </ListItem>
              )
            })}
          </List>
          {/* {todaysGoals && (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={3}
              checkboxSelection
            />
          )} */}
        </div>
        <PageDrawer />
      </div>
    </>
  );
};
