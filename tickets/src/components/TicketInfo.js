import React from "react";
import {inject, observer} from "mobx-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Typography,
  Divider
} from "@material-ui/core";

@inject('store', 'appShellStore')
@observer
class TicketInfo extends React.Component {

  deleteTicket = async () => {
    try {
      await this.props.store.deleteTicket();
      this.props.appShellStore.showMessage({
        variant: 'success',
        message: `Ticket deleted!`
      });
    } catch (e) {
      this.props.appShellStore.showMessage({
        variant: 'error',
        message: e.message
      });
    }
  }

  render () {
    const { currentTicket } = this.props.store;

    return (
      <Dialog
        open={currentTicket !== null}
      >
        <DialogTitle>Ticket Info</DialogTitle>
        <DialogContent>
          <Grid container direction={'row'} spacing={2}>
            {currentTicket ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography><strong>Subject</strong></Typography>
                  <Typography>
                    {currentTicket.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Creation Date</strong></Typography>
                  <Typography>
                    {currentTicket.creation_date}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Creator</strong></Typography>
                  <Typography>
                    {currentTicket.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Body</strong></Typography>
                  <Typography>
                    {currentTicket.body}
                  </Typography>
                </Grid>
              </React.Fragment>
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            onClick={() => this.props.store.resetTicketInfo()}>
            Close
          </Button>
          <Button
            color={'secondary'}
            onClick={this.deleteTicket}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TicketInfo;