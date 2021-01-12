import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import "@fontsource/roboto";
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
// import {CreateMultiTheme} from '@material-ui/core/styles';
import { store } from "./redux/store";

const theme = createMuiTheme({
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
