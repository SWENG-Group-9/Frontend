import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Unauthenticated() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "20vh" }}
    >
      <Grid item xs={3}>
        <Typography variant="h3" component="h3" align="center">
          Unauthorized
        </Typography>
        <Typography variant="subtitle1" component="h5" align="center">
          You must login to access this page.
        </Typography>
      </Grid>
    </Grid>
  );
}
