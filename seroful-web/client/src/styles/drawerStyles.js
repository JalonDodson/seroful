import { makeStyles } from "@material-ui/core/styles";

export const drawerStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: 151.5,
  },
  drawerPaper: {
    backgroundColor: "#F2EDEB",
    opacity: 0.85,
    width: 151.5,
  },
  header: theme.mixins.toolbar,
  seroful: {
    marginTop: "7.5%",
    textAlign: "center",
    fontFamily: "Happy Monkey",
    color: "#bd93bd",
    fontSize: "35px",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  friendsButton: {
    textTransform: "capitalize",
    fontSize: "1rem",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif;",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938.em",
    background: "none",
  },
  videoButton: {
    textTransform: "capitalize",
    fontSize: "1rem",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif;",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.0025.em",
    background: "none",
    whiteSpace: "nowrap",
    right: "10%",
  },
  buttonGroup: {
    marginLeft: "15%",
  },
  addButton: {
    textTransform: "capitalize",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif;",
    backgroundColor: "#E9DFE3",
  },
  inputCont: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "4%",
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  boxText: {
    padding: theme.spacing(2, 2, 0),
    fontSize: "24px",
  },
  paper: {
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    paddingBottom: 5,
    margin: "0 auto",
    width: "20%",
    left: "9%",
  },
  paperClosed: {
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    left: "9%",
    paddingBottom: 5,
    margin: "0 auto",
    width: "15%",
  },
  list: {
    marginBottom: theme.spacing(2),
  },
}));
