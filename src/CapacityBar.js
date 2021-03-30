import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const normalise = (value, max) => (value * 100) / max;

const NormalLinearProgress = withStyles((theme) => ({
  root: {
    height: 35,
  },
}))(LinearProgress);

const WarningLinearProgres = withStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.warning.main,
  },
}))(NormalLinearProgress);

const ErrorLinearProgres = withStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.error.main,
  },
}))(NormalLinearProgress);

function CapacityBar(props) {
  let normValue = normalise(props.value, props.max);
  if (normValue > 100) {
    normValue = 100;
  }

  let status = "normal";
  if (normValue >= 75 && normValue < 90) {
    status = "warning";
  } else if (normValue >= 90) {
    status = "error";
  }

  return (
    <Box position="relative">
      {status === "normal" && (
        <NormalLinearProgress variant="determinate" value={normValue} />
      )}
      {status === "warning" && (
        <WarningLinearProgres variant="determinate" value={normValue} />
      )}
      {status === "error" && (
        <ErrorLinearProgres variant="determinate" value={normValue} />
      )}
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Typography
          variant="subtitle1"
          component="subtitle1"
          style={{ padding: "10px" }}
        >
          {props.value}/{props.max}
        </Typography>
      </Box>
    </Box>
  );
}

export default CapacityBar;
