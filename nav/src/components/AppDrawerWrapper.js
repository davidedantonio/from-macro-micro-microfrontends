import React from "react";
import AppDrawer from "./AppDrawer";
import { Provider } from "mobx-react";

const AppBarWrapper = (props) => {
  return (
    <Provider appShellStore={props.appShellStore}>
      <AppDrawer />
    </Provider>
  );
}


export default AppBarWrapper;