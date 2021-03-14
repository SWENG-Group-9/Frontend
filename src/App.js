import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import DevicesTable from "./DevicesTable";
import { withStyles } from "@material-ui/core/styles";
import CapacityBar from "./CapacityBar";
import LinearProgress from "@material-ui/core/LinearProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        IoT-Powered Pandemic Safety Suite
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          IoT-Powered Pandemic Safety Suite
        </Typography>
        <br />
        <CapacityBar />
        <br />
        <DevicesTable />
        <Copyright />
      </Box>
    </Container>
  );
}
