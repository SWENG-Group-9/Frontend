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
import Battery80Icon from "@material-ui/icons/Battery80";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background,
  },
}));

export default function DevicesTable() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
      <List className={classes.root}>
        <ListItem>
          <ListItemText
            disableTypography
            id="switch-list-label-entrance"
            primary={
              <Typography variant="h4" style={{ color: "#1a535c" }}>
                Entrance
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("entrance")}
              checked={checked.indexOf("entrance") !== -1}
              inputProps={{ "aria-labelledby": "switch-list-label-entrance" }}
            />
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton edge="end" aria-label="Battery">
              <Battery80Icon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            id="switch-list-label-exit"
            primary={
              <Typography variant="h4" style={{ color: "#1a535c" }}>
                Exit
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle("exit")}
              checked={checked.indexOf("exit") !== -1}
              inputProps={{ "aria-labelledby": "switch-list-label-exit" }}
            />
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton edge="end" aria-label="Battery">
              <Battery80Icon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
}
