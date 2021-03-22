import {AppBar, Toolbar, Typography, Button, IconButton, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {AccountCircle, Widgets} from '@material-ui/icons/';

const useStyles = makeStyles((theme)=>({
    appBarStyle:{
        width:'100%',
        padding:5,
        margin:0,
    },
    buttonStyle:{
        height:35,
        margin:10,
        [theme.breakpoints.up('xs')]: {
            width:100
        },
        [theme.breakpoints.up('md')]: {
            width:130
        },
        [theme.breakpoints.up('lg')]: {
            width:150,
        },
    },
    placeHolder:{
        fontSize:25,
        fontStyle:'oblique',
        fontWeight:'bold',
        margin:10,
    },
    buttonText:{
        [theme.breakpoints.up('xs')]: {
            fontSize:10
        },
        [theme.breakpoints.up('md')]: {
            fontSize:11
        },
        [theme.breakpoints.up('lg')]: {
            fontSize:13
        },
    }
})); 

export default function HeadBar() {
    const classes = useStyles();
    return(
        <AppBar position="static" className={classes.appBarStyle}>
            <Toolbar>
                <Grid container spacing={0}>
                    <Grid item xs={7}>
                        <Typography className ={classes.placeHolder} variant="h5" color="initial">
                            Place Holder Logo
                        </Typography>
                    </Grid>
                    <Grid container spacing={0} xs={4}>
                        <Grid item xs >
                            <Button color="secondary" variant="contained" className={classes.buttonStyle}>
                                <Typography className={classes.buttonText}>Manage Devices</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Button color="secondary" variant="contained" className={classes.buttonStyle}>
                                <Typography className={classes.buttonText}>View Data</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton aria-label="account-tab" className={classes.iconButton}>
                            <AccountCircle size/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};