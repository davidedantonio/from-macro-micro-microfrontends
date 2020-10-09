import React from "react";
import TicketStore from "./../store/tickets.store";
import { Provider } from "mobx-react";
import {Grid} from "@material-ui/core";
import TicketWidget from "./TicketsWidget";
const ticketStore = new TicketStore();

function UserWidgetWrapper (props) {
  return (
    <Provider appShellStore={props.appShellStore} store={ticketStore}>
      <Grid container direction={'row'}>
        <Grid item xs={12}>
          <TicketWidget />
        </Grid>
      </Grid>
    </Provider>
  );
}

export default UserWidgetWrapper;