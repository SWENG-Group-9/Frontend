import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import App from "./App";
import AppStatistics from "./AppStatistics";
import theme from "./theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeadBar from "./HeadBar";
import PublicView from "./PublicView";
import Login from "./Login";
import Signup from "./Signup";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Helmet>
            <meta charSet="utf-8" />
            <title>IoT Pandemic Safety Suite</title>
          </Helmet>
          <HeadBar />
          <App />
        </Route>
        <Route exact path="/statistics">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Statistics</title>
          </Helmet>
          <HeadBar />
          <AppStatistics />
        </Route>
        <Route exact path="/public">
          <Helmet>
            <meta charSet="utf-8" />
            <title>IoT Pandemic Safety Suite</title>
          </Helmet>
          <PublicView />
        </Route>
        <Route exact path="/login">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Login</title>
          </Helmet>
          <HeadBar />
          <Login />
        </Route>
        <Route exact path="/signup">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Signup</title>
          </Helmet>
          <HeadBar />
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#root")
);
