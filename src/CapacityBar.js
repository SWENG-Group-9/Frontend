import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

//Using style in component
class CapacityBar extends React.Component {
  render() {
    return <LinearProgress variant="determinate" value={50} />;
  }
}

export default CapacityBar;
