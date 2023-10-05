import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "./view/pages/HomePage";
import "./App.css";

const FONT_FAMILY = "  Alegreya Sans; Carlito;  Advent Pro; Bubbler One";
const THEME = createTheme({
  palette: {
    primary: {
      main: "#ccc",
    },
    secondary: {
      main: "#f80",
    },
    info: {
      main: "#084",
    },
    warning: {
      main: "#f80",
    },
    error: {
      main: "#800",
    },
  },
  typography: {
    fontFamily: [FONT_FAMILY, "sans-serif"].join(","),
    fontSize: 12,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
