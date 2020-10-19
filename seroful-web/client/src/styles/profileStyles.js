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
  card: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '60%',
    width: '45%',
    marginLeft: '20%',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 'auto'
    // top: "5vh",
    // left: "20vw",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
