import { makeStyles } from '@material-ui/core/styles';

export const settingsStyles = makeStyles((themes) => ({
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