import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route component={Home} />
      </Switch>
    </ThemeProvider>
  );
}
