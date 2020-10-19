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


const useStyles = makeStyles({
  table: {
    minwidth: 650,
  },
});


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];




export const Profile = (props) => {
  const styles = profileStyles();
  const classes = useStyles();
  const user = useRecoilValue(userState);
  console.log(user.plans);
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
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
    </>
  )};
