import { makeStyles } from "@material-ui/core/styles"



export const loginStyles = makeStyles((theme) => ({
    loginDiv: {
        textAlign: "center",
    },
    seroful: {
        fontFamily: "Happy Monkey",
        color: "#21a3fc",
        fontSize: "56px",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    images: {
        height: 350,
        width: 350,
    },
    button1: {
        backgroundImage: "linear-gradient(90deg, rgba(33,163,252,1) 0%, rgba(75,110,198,1) 51%, rgba(31,122,204,1) 100%)",
        width: "9.5%",
        marginTop: ".5%",
        marginRight: "1%"
    },
    button2: {
        backgroundImage: "linear-gradient(90deg, rgba(75,110,198,1) 0%, rgba(31,122,204,1) 51%, rgba(33,163,252,1) 100%)",
        marginTop: ".5%",
        width: "9.5%"
    },
    email: {
        width: "20%",
    },
    password: {
        width: "20%",
    }
}))