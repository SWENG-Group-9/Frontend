import {AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {AccountCircle} from '@material-ui/icons/';

const useStyles = makeStyles({
    appBarStyle:{
        width:'100%',
        padding:5,
    },
    buttonStyle:{
        height:35,
        margin:10,
    },
    placeHolder:{
        fontSize:25,
        fontStyle:'oblique',
        fontWeight:'bold',
        margin:10
    },
    buttonText:{
        fontSize:13,
    }
}); 

export default function HeadBar() {
    const classes = useStyles();
    return(
        <AppBar position="sticky" className={classes.appBarStyle}>
            <Toolbar>
                <Typography className ={classes.placeHolder} variant="h5" color="initial">
                    Place Holder  
                </Typography>
                <Button color="secondary" variant="contained" disabled className={classes.buttonStyle}>
                    <Typography className={classes.buttonText}>Manage Devices</Typography>
                </Button>
                <Button color="secondary" variant="contained" className={classes.buttonStyle}>
                    <Typography className={classes.buttonText}>View Data</Typography>
                </Button>
                <IconButton aria-label="account-tab" className={classes.iconButton}>
                    <AccountCircle/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};