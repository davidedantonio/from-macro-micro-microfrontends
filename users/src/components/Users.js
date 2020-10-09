import React from "react";
import UsersStore from "./../store/users.store";
import { Provider } from "mobx-react";
import UsersTable from "./UsersTable";
import {Grid} from "@material-ui/core";

const userStore = new UsersStore();

function Users (props) {
  return (
    <Provider appShellStore={props.appShellStore} store={userStore}>
      <Grid container direction={'row'}>
        <Grid item xs={12}>
          <UsersTable />
        </Grid>
      </Grid>
    </Provider>
  );
}

export default Users;