import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import AppStatistics from './AppStatistics';
import theme from './theme';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App/>
        </Route>
        <Route exact path="/statistics">
          <AppStatistics/>
        </Route>
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector('#root'),
);
