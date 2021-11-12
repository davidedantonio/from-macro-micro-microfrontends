import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import {Search} from "@material-ui/icons";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Container,
  Paper
} from "@material-ui/core";
import AddTicket from "./AddTicket";
import TicketInfo from "./TicketInfo";

const TicketsTable = ({
  store,
  appShellStore
}) => {

  useEffect(() => {
    appShellStore.changeTitle("Tickets")
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      await store.loadTickets();
      appShellStore.showMessage({
        variant: 'success',
        message: `Tickets list loaded!`
      });
    } catch (e) {
      appShellStore.showMessage({
        variant: 'error',
        message: e.message
      });
    }    
  }

  return (
    <Container maxWidth={'md'}>
      <Paper>
        <Table style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Creator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.rows.map(item => {
              return (
                <TableRow key={item._id}>
                  <TableCell>
                    <IconButton
                      size={'small'}
                      onClick={() => store.getTicketInfo(item._id)}>
                      <Search />
                    </IconButton>
                  </TableCell>
                  <TableCell>{item.created_on}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.username}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>

      <TicketInfo />
      <AddTicket />

    </Container>
  )
}

export default inject('store', 'appShellStore')(observer(TicketsTable));