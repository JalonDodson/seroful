import { makeStyles } from "@material-ui/core/styles";

export const settingsStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 151.5,
  },
  header: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto",
  },
  imgForm: {
    margin: "auto",
    display: "flex",
    justifyContent: "centered",
    flexDirection: "column",
    flexGrow: 1,
    border: "1px solid",
    width: "60%",
    height: "50%",
  },
  textForm: {
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    flexGrow: 1,
    border: "1px solid",
    width: "60%",
    height: "50%",
  },
  instructor: {
    alignSelf: "center",
  },
  submit: {
    alignSelf: "flex-end",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
  input: {
    visibility: "hidden",
    ref: "fileUploader",
  },
  inputs: {
    textAlign: "center"
  }
}));
