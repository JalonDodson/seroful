import { makeStyles } from "@material-ui/core/styles";

export const participantStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        border: '2px solid white',
        borderRadius: '5%',
        backgroundColor: 'slategrey',
        padding: '2%',
    },
    header: {
        flexGrow: 1,
        textAlign: 'center',
        margin: 'auto'
    },
    partVid: {
        border: '1px solid white',
    },
    butts: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    muteButt: {
        width: '10%',
        display: 'inline'
    },
    vidButt: {
        width: '10%',
        display: 'inline'

    },

}));
