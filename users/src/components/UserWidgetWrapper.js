import React from "react";
import UsersStore from "./../store/users.store";
import { Provider } from "mobx-react";
import {Grid} from "@material-ui/core";
import UsersWidget from "./UsersWidget";
const userStore = new UsersStore();

function UserWidgetWrapper (props) {
  return (
    <Provider appShellStore={props.appShellStore} store={userStore}>
      <Grid container direction={'row'}>
        <Grid item xs={12}>
          <UsersWidget />
        </Grid>
      </Grid>
    </Provider>
  );
}

export default UserWidgetWrapper;