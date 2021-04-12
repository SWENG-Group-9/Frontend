import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  enter: {
    backgroundColor: "#4ECDC4",
  },
  exit: {
    backgroundColor: "#FF6B6B",
  },
}));

const WhiteTypography = withStyles((theme) => ({
  root: {
    color: "#FFFFFF",
  },
}))(Typography);

const PrimaryTypography = withStyles((theme) => ({
  root: {
    fontWeight: 600,
  },
}))(WhiteTypography);

export default function PublicView() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({
    current: 0,
    max: 0,
  });

  useEffect(() => {
    const interval = setInterval(getData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    try {
      const currentGet = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/current"
      );

      const maxGet = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/max"
      );

      setData({
        current: currentGet.data,
        max: maxGet.data,
      });
      setLoaded(true);

      if (currentGet.data < maxGet.data) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box className={open ? classes.enter : classes.exit}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          {loaded ? (
            <>
              <PrimaryTypography
                variant="h1"
                component="h1"
                align="center"
                fontWeight="fontWeightBold"
              >
                {error ? "Error" : data.current}
              </PrimaryTypography>
              <WhiteTypography
                variant="h2"
                component="h2"
                align="center"
                fontStyle="italic"
              >
                {error
                  ? "Contact Administrator"
                  : open
                  ? "Come on in!"
                  : "STOP"}
              </WhiteTypography>
            </>
          ) : (
            <CircularProgress style={{ margin: 0 }} color="secondary" />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
