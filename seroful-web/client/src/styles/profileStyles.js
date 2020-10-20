import { makeStyles } from "@material-ui/core/styles";

export const profileStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 151.5,
  },
  header: {
    flexGrow: 1,
    textAlign: "center",
    margin: "0 auto",
  },
  card: {
    textAlign: "center",
    width: "30%",
    marginLeft: "35%",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: "auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));
