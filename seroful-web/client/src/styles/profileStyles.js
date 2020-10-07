import { makeStyles } from "@material-ui/core/styles";

export const profileStyles = makeStyles((theme) => ({
    main: {
        display: "flex",
        justifyContent: "baseline",
    },
    avatar: {
        width: 100,
        height: 100,
        top: "5vh",
        left: "20vw",
    }
}));
