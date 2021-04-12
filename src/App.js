import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

// SEO
import { Helmet } from "react-helmet";
import NavBar from "./components/NavBar";

// Pages
import PublicView from "./pages/PublicView";
import AppStatistics from "./pages/AppStatistics";
import ManageDevices from "./pages/ManageDevices";
import Unauthenticated from "./pages/Unauthenticated";

function App({ pca }) {
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <Pages />
    </MsalProvider>
  );
}

function Pages() {
  return (
    <Switch>
      <Route exact path="/">
        <Helmet>
          <meta charSet="utf-8" />
          <title>IoT Pandemic Safety Suite</title>
        </Helmet>
        <NavBar />
        <AuthenticatedTemplate>
          <ManageDevices />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Unauthenticated />
        </UnauthenticatedTemplate>
      </Route>
      <Route exact path="/statistics">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Statistics</title>
        </Helmet>
        <NavBar />
        <AuthenticatedTemplate>
          <AppStatistics />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Unauthenticated />
        </UnauthenticatedTemplate>
      </Route>
      <Route exact path="/public">
        <Helmet>
          <meta charSet="utf-8" />
          <title>IoT Pandemic Safety Suite</title>
        </Helmet>
        <PublicView />
      </Route>
    </Switch>
  );
}

export default App;
