
import React from "react";
// , ThemeProvider
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { DataGrid } from '@material-ui/data-grid';
import { PageDrawer } from '../../PageDrawer/PageDrawer';
import { profileStyles } from '../../../styles/profileStyles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../../store/store";

// Material UI Class Styles

// Settings For Data Table [Production PLan Goals]

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'goalItem', headerName: 'Goal', width: 130 },
  { field: 'goalDescription', headerName: 'Description', width: 130 },
];


const rows = [
  { id: 1, goalItem: 'Example Goal', goalDescription: 'Example Description' },
];

export const Profile = (props) => {
  const styles = profileStyles();
  const [user, setUser] = useRecoilState(userState);
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
            Exapmle's Profile
          </Typography>
          <hr />
        </header>
        <Card className={styles.root}>
          <CardActionArea className={styles.main}>
            <Avatar className={styles.purple}>S</Avatar>
            <CardContent className={styles.content}>
              <Typography gutterBottom variant="h5" component="h2">
                Example Display Name
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
      </div>
    </>);
};