import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons/";

import WelcomeName from "../components/WelcomeName";

import { ReactComponent as Logo } from "../assets/logo.svg";

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

const SignInSignOut = () => {
  const classes = useStyles();
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginPopup();
  };

  const handleLogout = (logoutType) => {
    instance.logoutPopup();
  };
  return (
    <IconButton
      aria-label="account-tab"
      className={classes.iconButton}
      onClick={isAuthenticated ? handleLogout : handleLogin}
    >
      <AccountCircle />
    </IconButton>
  );
};

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
          <WelcomeName />
          <SignInSignOut />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
