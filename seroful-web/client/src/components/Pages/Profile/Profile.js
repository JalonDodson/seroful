import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Helmet } from "react-helmet";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { profileStyles } from "../../../styles/profileStyles";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/store";
import { getQuote } from "../../../util/api";

<<<<<<< HEAD

const useStyles = makeStyles({
  table: {
    minwidth: 650,
  },
});






=======
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "goalItem", headerName: "Goal", width: 130 },
  
];
>>>>>>> ba46134875069e9b94a64f58493ce660f74deee4

const quote = () => {
  const quote = [];
  getQuote().then((resp) => {
    quote.push(resp.contents.quotes[0].quote);
  });
  return quote;
};
const whatever = quote();
export const Profile = (props) => {
  let goalCount = 0;
  const styles = profileStyles();
  const classes = useStyles();
  const user = useRecoilValue(userState);
<<<<<<< HEAD
  console.log(user.plans[0].goals);
=======
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
    console.log(todaysGoals)
  const rows = todaysGoals
    ? todaysGoals &&
      todaysGoals[todaysGoals.length - 1].goals.map((x, i) => {
        console.log(x)
        goalCount++;
        const type = ["first", "second", "third"];
        return {
        id: goalCount,
        goalItem: x[type[i]] }}
      )
    : {
        id: 0,
        goalItem: "N/A",
      };
      console.log(rows)
  // const goals = user.goals && user.goals;
  // user.goals returns an array of objects, each object contains 3 goals (nested object of 3 strings) and a date in which the goals were made
>>>>>>> ba46134875069e9b94a64f58493ce660f74deee4
  return (
    <>
      <Helmet>
        <title>Seroful - Profile</title>
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
<<<<<<< HEAD
          <Typography variant="h3" className={styles.title}>
          {`${user.displayName}'s Profile Page`}
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
                {`${user.displayName}'s Profile Page`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <hr />
        <br />
        <div style={{ height: 325, width: "100%", backgroundColor: "#fff" }}>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{user.displayName} 's Goals</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.plans[0].goals.map((goal, index) => (
            <TableRow key={index++}>
              <TableCell component="th" scope="row">
                {goal}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
=======
          <Typography variant="h2" className={styles.title}>
            {user.displayName}
          </Typography>
          <hr />
        </header>
        <Card className={styles.card}>
          {user && user.photoURL ? <Avatar src={user.photoURL} alt={`${user.username}`} /> : <Avatar></Avatar>user.displayName[0]}
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
        <div style={{ margin: 'auto', float: "right",height: '70%', width: "35%", backgroundColor: "#fff" }}>
          {todaysGoals &&
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          checkboxSelection
          />
        }
        </div>
<PageDrawer />
>>>>>>> ba46134875069e9b94a64f58493ce660f74deee4
      </div>
    </div>
    </>
  )};
