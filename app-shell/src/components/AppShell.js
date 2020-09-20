import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "mobx-react";
import {appShellStore} from "../store/app-shell.store";
import MainApp from "./MainApp";

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#212121'
    },
    primary: {
      light: '#CFD8DC',
      main: '#607D8B',
      dark: '#455A64',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#B2DFDB',
      main: '#009688',
      dark: '#00796B',
      contrastText: '#ffffff'
    }
  }
});

const AppShell = () => {
  return (
    <Provider store={appShellStore}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <MainApp />
        </React.Fragment>
      </ThemeProvider>
    </Provider>

  );
};

export default AppShell;
