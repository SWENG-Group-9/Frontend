import React, { useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background,
  },
}));

export default function DevicesTable() {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("Error");
  const [addOpen, setAddOpen] = React.useState(false);
  const [deviceCodeOpen, setDeviceCodeOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  const [deviceCode, setDeviceCode] = React.useState("");
  const [devices, setDevices] = React.useState([]);

  useEffect(() => {
    const interval = setInterval(getData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    try {
      const getDevices = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/devices"
      );
      let tempDevices = [];
      getDevices.data.forEach((element) => {
        let deviceType = "Both";
        if (element[2] === "in") {
          deviceType = "Entrance";
        } else if (element[2] === "out") {
          deviceType = "Exit";
        }

        tempDevices.push({
          name: element[0],
          id: element[1],
          type: deviceType,
          status: element[3],
          override: element[4],
        });
      });
      setDevices(tempDevices);
    } catch (error) {
      setError(true);
      setErrorMessage("Error getting devices.");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const hadleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleClickAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAdd = async () => {
    setAddOpen(false);
    try {
      const addDevice = await axios.post(
        process.env.REACT_APP_BACKEND_ENDPOINT +
          "/api/devices/" +
          name +
          "/" +
          type
      );
      setDeviceCodeOpen(true);
      setDeviceCode(addDevice.data);
      setName("");
      setType("");
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage("Error adding device.");
    }
  };

  const handleDeviceCodeClose = () => {
    setDeviceCodeOpen(false);
  };

  const handleLock = async (device) => {
    try {
      const lockDoor = await axios.put(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/door/" + device.id
      );
    } catch (error) {
      setError(true);
      setErrorMessage("Error overriding door lock.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteDevice = await axios.delete(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/devices/" + id
      );
    } catch (error) {
      setError(true);
      setErrorMessage("Error deleting device.");
    }
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  return (
    <>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h3" component="h3">
            Devices
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Add Device" aria-label="add device">
            <Fab color="primary" aria-label="add">
              <AddIcon onClick={handleClickAddOpen} />
            </Fab>
          </Tooltip>
        </Box>
      </Box>

      <Dialog
        open={addOpen}
        onClose={handleAddClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a device to your system. Please provide the device name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="deviceName"
            label="Device Name"
            type="text"
            onChange={handleNameChange}
            fullWidth
          />
          <TextField
            id="entranceType"
            select
            label="Entrance Type"
            value={type}
            onChange={hadleTypeChange}
            fullWidth
          >
            <MenuItem value={"in"}>Entrance</MenuItem>
            <MenuItem value={"out"}>Exit</MenuItem>
            <MenuItem value={"both"}>Both</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deviceCodeOpen}
        onClose={handleDeviceCodeClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Device Code</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please use the following code to add your device to the system.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {deviceCode}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeviceCodeClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box flexGrow={1}>
        <List className={classes.root}>
          {devices.map((device) => (
            <ListItem key={device.id}>
              <ListItemText
                disableTypography
                id="switch-list-label-entrance"
                primary={
                  <Typography variant="h4" style={{ color: "#1a535c" }}>
                    {device.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="h6" style={{ color: "#1a535c" }}>
                    {device.type}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip
                  title={
                    device.status
                      ? "Override Device Unlock"
                      : "Override Device Lock"
                  }
                  aria-label="override device lock"
                >
                  <IconButton
                    edge="end"
                    aria-label="LockIcon"
                    onClick={() => handleLock(device)}
                    color={device.override ? "primary" : "default"}
                  >
                    {device.status ? (
                      <LockOutlinedIcon />
                    ) : (
                      <LockOpenOutlinedIcon />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Device" aria-label="delete device">
                  <IconButton onClick={() => handleDelete(device.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleErrorClose}
          severity="error"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
