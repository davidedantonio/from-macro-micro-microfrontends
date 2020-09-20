import React from "react";
import UsersStore from "./../store/users.store";
import { Provider } from "mobx-react";
import UsersTable from "./UsersTable";
import {Grid} from "@material-ui/core";
import { useServiceContext } from "shell/Service";

const userStore = new UsersStore();

function Users (props) {
  const serviceContext = useServiceContext();
  React.useEffect(() => {
    serviceContext.setService({ title: "Users" });
  }, []);

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