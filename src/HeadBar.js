import {AppBar, Toolbar, Typography, Button, IconButton, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {AccountCircle, Widgets} from '@material-ui/icons/';
import {Link as RouterLink} from 'react-router-dom';

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
            width:100,
            height:40
        },
        [theme.breakpoints.up('md')]: {
            width:130,
            height:35
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
        textAlign:"center",
        fontSize:12
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
                    <Grid item xs={4}>
                        <Grid container spacing={0} >
                            <Grid item xs >
                                <Button component={RouterLink} to='/' color="secondary" variant="contained" className={classes.buttonStyle}>
                                    <Typography className={classes.buttonText}>
                                        Manage Devices
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item xs>
                                <Button component={RouterLink} to='/statistics' color="secondary" variant="contained" className={classes.buttonStyle}>
                                    <Typography className={classes.buttonText}>View Data</Typography>
                                </Button>
                            </Grid>
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