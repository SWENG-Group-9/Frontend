import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { makeStyles } from "@material-ui/styles";
import { AccountCircle } from "@material-ui/icons/";
import { Link as RouterLink } from "react-router-dom";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  appBarStyle: {
    width: "100%",
    padding: 5,
    margin: 0,
  },
  buttonStyle: {
    height: 35,
    margin: 10,
    [theme.breakpoints.up("xs")]: {
      width: 100,
      height: 40,
    },
    [theme.breakpoints.up("md")]: {
      width: 130,
      height: 35,
    },
    [theme.breakpoints.up("lg")]: {
      width: 150,
    },
  },
  logo: {
    maxHeight: "45px",
    maxWidth: "45px",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 12,
  },
}));

export default function HeadBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBarStyle}>
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Box flexGrow={1}>
            <Logo className={classes.logo} />
          </Box>
          <Button
            component={RouterLink}
            to="/public"
            color="secondary"
            variant="contained"
            className={classes.buttonStyle}
          >
            <Typography className={classes.buttonText}>Public View</Typography>
          </Button>
          <Button
            component={RouterLink}
            to="/"
            color="secondary"
            variant="contained"
            className={classes.buttonStyle}
          >
            <Typography className={classes.buttonText}>
              Manage Devices
            </Typography>
          </Button>
          <Button
            component={RouterLink}
            to="/statistics"
            color="secondary"
            variant="contained"
            className={classes.buttonStyle}
          >
            <Typography className={classes.buttonText}>View Data</Typography>
          </Button>
          <IconButton
            aria-label="account-tab"
            className={classes.iconButton}
            component={RouterLink}
            to="/login"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
