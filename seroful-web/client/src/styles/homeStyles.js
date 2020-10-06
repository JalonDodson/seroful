import { makeStyles } from "@material-ui/core/styles";

export const homeStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: 150,
    },
    drawerPaper: {
        backgroundColor: "#FFDD00",
        opacity: .85,
        width: 150,
    },
    header: theme.mixins.toolbar,
    seroful: {
        marginTop: "7.5%",
        textAlign: "center",
        fontFamily: "Happy Monkey",
        color: "#21a3fc",
        fontSize: "35px",
        fontWeight: "bold",
        fontStyle: "italic",
    },
}));
