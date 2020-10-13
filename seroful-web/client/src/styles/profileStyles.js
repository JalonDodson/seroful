import { makeStyles } from "@material-ui/core/styles";

export const profileStyles = makeStyles((theme) => ({
  container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 151.5,
  },
  header: {
      flexGrow: 1,
      textAlign: 'center',
      margin: 'auto'
  },
  root: {
    maxWidth: 345,
    height: 400,
  },
  // avatar: {
  //   display: 'flex',
  //   marginLeft: '150px',
  // },
  content: {
    display: 'flex',
    marginLeft: '100px',
  },
  purple: {
    display: 'flex',
    marginLeft: '150px',
    // backgroundColor: deepPurple[500],
  },
  main: {
    marginTop: '30%',
    display: "flex",
    justifyContent: "baseline",
  },
  avatar: {
    width: 100,
    height: 100,
    top: "5vh",
    left: "20vw",
  },
}));
