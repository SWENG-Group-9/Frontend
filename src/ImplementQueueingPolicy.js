import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background,
  },
}));


export default function ImplementQueingPolicy() {
  const [IQPOpen, setIQPOpen] = React.useState(false);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleIQPOpen = () => {
    setIQPOpen(true);
  };

  const handleIQPClose = () => {
    setIQPOpen(false);
  };

  return (
    <>
    <Box textAlign="right">
        <Button
          variant="contained"
          onClick={handleIQPOpen}
          color="primary"
          size="small"
        >
          Set Max Occupancy
        </Button>
      </Box>
      <br/>
    <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h4" component="h3">
            Automatic Queing System
          </Typography>
        </Box>
        <Box>
        <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
        </Box>
      </Box>

      <Dialog
        open={IQPOpen}
        onClose={handleIQPClose}
        aria-labelledby="form-IQP-title"
      >
        <DialogTitle id="form-IQP-title">
          Set Max Occupancy
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            What is the maximum number of building occupants allowed on
            premises?
          </DialogContentText>
          <br />
          <TextField
            id="outlined-number"
            label="Max Occupants"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIQPClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleIQPClose} color="primary" variant="outlined">
            Implement
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
