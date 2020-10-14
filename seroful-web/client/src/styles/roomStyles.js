import { makeStyles } from '@material-ui/styles';

export const roomStyles = makeStyles((theme) => ({
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