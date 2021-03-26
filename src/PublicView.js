import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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
  let open = true;

  const classes = useStyles();
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
          <PrimaryTypography
            variant="h1"
            component="h1"
            align="center"
            fontWeight="fontWeightBold"
          >
            54
          </PrimaryTypography>
          <WhiteTypography
            variant="h2"
            component="h2"
            align="center"
            style={{}}
            fontStyle="italic"
          >
            {open ? "Come on in!" : "STOP"}
          </WhiteTypography>
        </Grid>
      </Grid>
    </Box>
  );
}
