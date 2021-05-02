import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

import CapacityBar from "../components/CapacityBar";
import DevicesTable from "../components/DevicesTable";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        IoT-Powered Pandemic Safety Suite
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function ManageDevices() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    current: 0,
    max: 0,
  });
  const [enabled, setEnabled] = useState(true);

  const handleEnable = async (event) => {
    try {
      let disable = 0;
      if (event.target.checked) {
        disable = 1;
      }

      const enable = await axios.post(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/door/" + disable
      );

      console.log(enable);
    } catch (error) {}
  };

  useEffect(() => {
    const interval = setInterval(getData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    try {
      const current = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/current"
      );

      const max = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/max"
      );

      const enable = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/door"
      );

      setEnabled(enable.data);

      setData({
        current: current.data,
        max: max.data,
      });
      setLoaded(true);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={4}>
          <Typography variant="h4" component="h4" align="center" gutterBottom>
            Error loading data from server.
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Please contact the administrator.
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Container maxWidth="sm" style={{ padding: 0 }}>
        {loaded ? (
          <Box my={4}>
            <Box my={4}>
              <Typography variant="h4" gutterBottom>
                IoT-Powered Pandemic Safety Suite
              </Typography>
            </Box>
            <Box my={4} display="flex">
              <Box flexGrow={1} alignSelf="center">
                <CapacityBar current={data.current} max={data.max} />
              </Box>
              <Box alignSelf="center">
                <Tooltip
                  title={(enabled ? "Disable" : "Enable") + " System"}
                  aria-label={(enabled ? "disable" : "enable") + " system"}
                >
                  <Checkbox checked={enabled} onChange={handleEnable} />
                </Tooltip>
              </Box>
            </Box>
            <DevicesTable />
            <Copyright />
          </Box>
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "60vh" }}
          >
            <Grid item xs={3}>
              <CircularProgress style={{ margin: 0 }} />
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}
