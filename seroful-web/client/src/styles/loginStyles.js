import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

export const loginStyles = makeStyles((theme) => ({
  loginDiv: {
    textAlign: "center",
  },
  seroful: {
    fontFamily: "Happy Monkey",
    color: "#F2EDEB",
    fontSize: "56px",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  images: {
    height: 350,
    width: 350,
  },
  button1: {
    backgroundImage:
      "linear-gradient(90deg, rgba(236,217,238,1) 0%, rgba(226,221,220,1) 51%, rgba(236,217,238,1) 100%);",
    width: "9.5%",
    marginTop: ".5%",
    marginRight: "1%",
  },
  button2: {
    backgroundImage:
      "linear-gradient(90deg, rgba(236,217,238,1) 0%, rgba(226,221,220,1) 51%, rgba(236,217,238,1) 100%);",
    marginTop: ".5%",
    width: "9.5%",
  },
  email: {
    width: "20%",
  },
  username: {
    width: "20%",
  },
  names: {
    width: "20%",
  },
  password: {
    width: "20%",
  },
  helper: {
    fontStyle: "italic",
    color: "#FF0000",
    fontSize: 20,
    fontFamily: "Happy Monkey",
    textTransform: "capitalize",
  },
}));

export const textTheme = createMuiTheme({
    palette: {
      primary: {
          main: "#F2EDEB"
      }
    },
});
