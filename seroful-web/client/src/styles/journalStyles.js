import { makeStyles } from '@material-ui/core/styles';

export const journalStyles = makeStyles((themes) => ({
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
    inter: {
        display: 'flex',
        width: '60%',
        alignSelf: 'center',
        justifyContent: 'space-between'

    },
    pastEntries: {
        width: '30%',
        marginTop: '7%',
        marginLeft: '20%',
    },
    form: {
        flexGrow: 1,
        border: '1px solid',
        width: '30%',        
    },
    submit: {
        alignSelf: 'flex-end',
    },

}));