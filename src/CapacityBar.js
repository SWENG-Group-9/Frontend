import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const normalise = (value, max) => (value * 100) / max;

const NormalLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
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
    <React.Fragment>
      {status === "normal" && (
        <NormalLinearProgress variant="determinate" value={normValue} />
      )}
      {status === "warning" && (
        <WarningLinearProgres variant="determinate" value={normValue} />
      )}
      {status === "error" && (
        <ErrorLinearProgres variant="determinate" value={normValue} />
      )}
      <Typography variant="subtitle1" component="subtitle1">
        {props.value}/{props.max}
      </Typography>
    </React.Fragment>
  );
}

export default CapacityBar;
