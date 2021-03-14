import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4ecdc4",
    },
    secondary: {
      main: "#1A535C",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f7fff7",
    },
  },
});

export default theme;
