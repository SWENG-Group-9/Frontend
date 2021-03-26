import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background,
  },
}));

export default function DevicesTable() {
  const classes = useStyles();
  let locked = true;

  const handleLock = (value) => () => {
    locked = !locked;
    console.log(locked);
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
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      <Box flexGrow={1}>
        <List className={classes.root}>
          <ListItem>
            <ListItemText
              disableTypography
              id="switch-list-label-entrance"
              primary={
                <Typography variant="h4" style={{ color: "#1a535c" }}>
                  Frontdoor
                </Typography>
              }
              secondary={
                <Typography variant="h6" style={{ color: "#1a535c" }}>
                  Entrance
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="LockIcon" onClick={handleLock}>
                {locked ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
              </IconButton>
              <IconButton edge="end" aria-label="MoreVertIcon">
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
