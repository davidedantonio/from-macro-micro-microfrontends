import React from "react";
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

@inject('store', 'appShellStore')
@observer
class TicketsTable extends React.Component {
  async componentDidMount() {
    try {
      const { store } = this.props;
      this.props.appShellStore.changeTitle("Tickets");
      await store.loadTickets();
      this.props.appShellStore.showMessage({
        variant: 'success',
        message: `Tickets list loaded!`
      });
    } catch (e) {
      this.props.appShellStore.showMessage({
        variant: 'error',
        message: e.message
      });
    }
  }

  render() {
    const { store } = this.props;

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
                        onClick={() => this.props.store.getTicketInfo(item._id)}>
                        <Search />
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.creation_date}</TableCell>
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
}

export default TicketsTable;