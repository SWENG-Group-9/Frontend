import React from "react";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const normalise = (value, max) => (value * 100) / max;

const StatusLinearProgress = withStyles((theme) => ({
  root: {
    height: 35,
  },
  bar: {
    backgroundColor: (props) => props.status,
  },
}))(LinearProgress);

function CapacityBar(props) {
  const theme = useTheme();
  const [maxOpen, setMaxOpen] = React.useState(false);
  const [maxTemp, setMaxTemp] = React.useState(props.max);
  const [current, setCurrent] = React.useState(props.current);
  const [max, setMax] = React.useState(props.max);

  const updateMax = (event) => {
    setMaxTemp(event.target.value);
  };

  const handleClickMaxOpen = () => {
    setMaxOpen(true);
  };

  const handleMaxOpenSubmit = async () => {
    let error = false;
    try {
      const setMax = await axios.put(
        "https://pandemicsafetysuitebackend.azurewebsites.net/api/max/" +
          maxTemp
      );
    } catch (error) {
      error = true;
    }
    if (!error) {
      setMax(maxTemp);
      setMaxTemp(max);
      setMaxOpen(false);
    }
  };

  const handleMaxOpenCancel = () => {
    setMaxTemp(max);
    setMaxOpen(false);
  };

  let normValue = normalise(current, max);
  if (normValue > 100) {
    normValue = 100;
  }

  let status = theme.palette.primary.main;
  if (normValue >= 75 && normValue < 90) {
    status = theme.palette.warning.main;
  } else if (normValue >= 90) {
    status = theme.palette.error.main;
  }

  return (
    <Box position="relative">
      <StatusLinearProgress
        variant="determinate"
        value={normValue}
        status={status}
      />

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
          component="h6"
          style={{ padding: "10px" }}
          onClick={handleClickMaxOpen}
        >
          {current}/{max}
        </Typography>
        <Dialog
          open={maxOpen}
          onClose={handleMaxOpenCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Max People</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Set the max number of people allowed on the premises
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="number"
              label="Number"
              type="number"
              fullWidth
              onInput={updateMax}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMaxOpenCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleMaxOpenSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default CapacityBar;
