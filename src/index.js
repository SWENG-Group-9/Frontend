import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import AppStatistics from "./AppStatistics";
import theme from "./theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeadBar from "./HeadBar";
import PublicView from "./PublicView";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HeadBar />
          <App />
        </Route>
        <Route exact path="/statistics">
          <HeadBar />
          <AppStatistics />
        </Route>
        <Route exact path="/public">
          <PublicView />
        </Route>
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#root")
);
