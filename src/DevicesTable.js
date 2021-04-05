import React from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background,
  },
}));

const tempDevices = [
  {
    name: "Front door",
    type: "Entrance",
  },
  {
    name: "Back door",
    type: "Exit",
  },
];

export default function DevicesTable() {
  const classes = useStyles();
  const [locked, setLocked] = React.useState(["locked"]);
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [type, setType] = React.useState("");

  const hadleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleClickAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleLock = (value) => () => {
    const currentIndex = locked.indexOf(value);
    const newLock = [...locked];

    if (currentIndex === -1) {
      newLock.push(value);
    } else {
      newLock.splice(currentIndex, 1);
    }

    setLocked(newLock);
  };

  const anchorRef = React.useRef(null);

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h3" component="h3">
            Devices
          </Typography>
        </Box>
        <Box>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={handleClickAddOpen} />
          </Fab>
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
            <MenuItem value={"Entrance"}>Entrance</MenuItem>
            <MenuItem value={"Exit"}>Exit</MenuItem>
            <MenuItem value={"Both"}>Both</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box flexGrow={1}>
        <List className={classes.root}>
          {tempDevices.map((device) => (
            <ListItem>
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
                <IconButton
                  edge="end"
                  aria-label="LockIcon"
                  onClick={handleLock("1")}
                >
                  {locked.indexOf("1") !== -1 ? (
                    <LockOutlinedIcon />
                  ) : (
                    <LockOpenOutlinedIcon />
                  )}
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="MoreVertIcon"
                  aria-haspopup="true"
                  aria-controls={open ? "menu-list-grow" : undefined}
                  onClick={handleOpen}
                  ref={anchorRef}
                >
                  <MoreVertIcon />
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    placement="right"
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={handleClose}>
                                Manage Device
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                Door Statistics
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
