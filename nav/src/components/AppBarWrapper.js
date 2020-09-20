import React from "react";
import AppBar from "./AppBar";
import { Provider } from "mobx-react";

const AppBarWrapper = (props) => {
  return (
    <Provider appShellStore={props.appShellStore}>
      <AppBar drawer={props.drawer} />
    </Provider>
  );
}


export default AppBarWrapper;