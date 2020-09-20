import React from "react";
import TicketsStore from "./../store/tickets.store";
import { Provider } from "mobx-react";
import TicketsTable from "./TicketsTable";
import {Grid} from "@material-ui/core";

const ticketsStore = new TicketsStore();

function Tickets (props) {
  return (
    <Provider appShellStore={props.appShellStore} store={ticketsStore}>
      <Grid container direction={'row'}>
        <Grid item xs={12}>
          <TicketsTable />
        </Grid>
      </Grid>
    </Provider>
  );
}

export default Tickets;