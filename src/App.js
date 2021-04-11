import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import DevicesTable from "./DevicesTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import CapacityBar from "./CapacityBar";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        IoT-Powered Pandemic Safety Suite
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function App() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    current: 0,
    max: 0,
  });
  const [enabled, setEnabled] = useState(true);

  const handleEnable = (event) => {
    setEnabled(event.target.checked);
  };

  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(async () => {
    try {
      const current = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/current"
      );

      const max = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/max"
      );

      setData({
        current: current.data,
        max: max.data,
      });
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoaded(true);
  });

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
                <Checkbox checked={enabled} onChange={handleEnable} />
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
