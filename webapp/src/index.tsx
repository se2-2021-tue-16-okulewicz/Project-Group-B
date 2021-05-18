import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
const createTheme =
  process.env.NODE_ENV === "production"
    ? createMuiTheme
    : unstable_createMuiStrictModeTheme;
const theme = createTheme(); //mui library throws warning in development without usting newer version of creatingMuiTheme (mui 5.0),
//other libraries need an older version of mui, so different theme needs to be used in development

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
