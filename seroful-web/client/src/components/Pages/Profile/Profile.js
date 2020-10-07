import { StylesContext } from "@material-ui/styles";
import React from "react";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import { DataGrid } from '@material-ui/data-grid';

// Material UI Class Styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 400,
  },
  avatar: {
    display: 'flex',
    marginLeft: '150px',
  },
  content: {
    display: 'flex',
    marginLeft: '100px',
  },
  purple: {
    display: 'flex',
    marginLeft: '150px',
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  main: {
    marginTop: '30%',
  }
}));

// Settings For Data Table [Production PLan Goals]

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'goalItem', headerName: 'Goal', width: 130 },
  { field: 'goalDescription', headerName: 'Description', width: 130 },
];

const rows = [
  { id: 1, goalItem: 'Example Goal', goalDescription: 'Example Description'},
];

export const Profile = (props) => {
  const classes = useStyles();
  return (
  <>
    <h1>Welcome To Your Profile!</h1>
    <Card className={classes.root}>
      <CardActionArea className={classes.main}>
        <Avatar className={classes.purple}>S</Avatar>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            My Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This is my profile page.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <hr />
    <br />
    <div style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  </>);
};
