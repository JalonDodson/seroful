import { makeStyles } from "@material-ui/core/styles";

export const homeStyles = makeStyles((theme) => ({
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
}));
