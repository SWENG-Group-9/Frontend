import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import DevicesTable from "./DevicesTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import CapacityBar from "./CapacityBar";
import ImplementQueingPolicy from "./ImplementQueueingPolicy";

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
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);

  // // Note: the empty deps array [] means
  // // this useEffect will run once
  // // similar to componentDidMount()
  // useEffect(() => {
  //   fetch("https://pandemicsafetysuitebackend.azurewebsites.net/api/max")
  //     .then((res) => {
  //       res.json();
  //     })
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setItems(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);

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
        {isLoaded ? (
          <Box my={4}>
            <Box my={4}>
              <Typography variant="h4" gutterBottom>
                IoT-Powered Pandemic Safety Suite
              </Typography>
            </Box>
            <Box my={4}>
              <CapacityBar value={10} max={22} />
            </Box>
            <ImplementQueingPolicy />
            <br />

            <br />
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
