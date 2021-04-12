import React from "react";
import Box from "@material-ui/core/Box";
import { AccountCircle } from "@material-ui/icons/";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
} from "@material-ui/core";

export default function Signup(props) {
  return (
    <Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Avatar>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </Grid>
    </Box>
  );
}
