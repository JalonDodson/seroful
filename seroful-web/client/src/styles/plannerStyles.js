import { makeStyles } from "@material-ui/core/styles";

export const plannerStyles = makeStyles((theme) => ({
  accordions: {
    margin: "0 auto",
    display: "inline-flex",
    alignItems: "baseline",
  },
  accordion: {
    width: "30vw",
    left: "8.5vw",
  },
  newPlanner: {
    margin: "0 auto",
    display: "flex",
  },
  planner: {
    marginLeft: "50vw",
    width: "30%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
