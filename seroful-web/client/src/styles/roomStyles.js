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
    title: {},
    locPart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logoutButt: {
        marginTop: '5px',
        boxShadow: '5px 2px 2px slategrey',
        width: '25%',
        left: "34vw"
    },
    buttCont: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    remParts: {},

}));