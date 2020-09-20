import React from "react";
import {inject, observer} from "mobx-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid, Button,
  withStyles,
  Fab,
  TextField
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const style = {
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
};

@inject('store', 'appShellStore')
@observer
class addTicket extends React.Component {
  state = {
    ticket: {
      body: null,
      subject: null
    }
  }

  closeModal = () => {
    this.props.store.closeModal();
    this.reset();
  }

  openModal = () => {
    this.setState({
      ticket: {
        body: null,
        subject: null
      }
    });

    this.props.store.openModal();
  }

  reset = () => {
    this.setState({
      ticket: {
        body: null,
        subject: null
      }
    });
  }

  saveTicket = async () => {
    try {
      await this.props.store.addTicket(this.state.ticket)
      this.props.appShellStore.showMessage({
        variant: 'success',
        message: `Ticket created!`
      });
    } catch (e) {
      this.props.appShellStore.showMessage({
        variant: 'error',
        message: e.emssage
      });
    }
  }

  render () {
    const { open } = this.state;
    const { classes, store } = this.props;

    return (
      <React.Fragment>
        <Fab
          onClick={() => this.openModal()}
          aria-label={"Add User"}
          className={classes.fab}
          color={'primary'}>
          <Add />
        </Fab>
        <Dialog
          open={store.opened}
          maxWidth={'sm'}
        >
          <DialogTitle>Add Ticket</DialogTitle>
          <DialogContent>
            <Grid container direction={'row'} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="subject"
                  label="Subject"
                  variant="filled"
                  fullWidth
                  onChange={e => this.setState({ ticket: Object.assign(this.state.ticket, { subject: e.target.value }) })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="body"
                  label="Body"
                  rows={9}
                  rowsMax={9}
                  variant="filled"
                  fullWidth
                  onChange={e => this.setState({ ticket: Object.assign(this.state.ticket, { body: e.target.value }) })}
                />
              </Grid>
              <Grid item xs={12}>
                {this.props.store.error ? <Alert severity={'error'}>{this.props.store.error}</Alert> : null}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              color={'primary'}
              onClick={() => this.closeModal()}>
              Close
            </Button>
            <Button
              color={'secondary'}
              onClick={this.saveTicket}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(addTicket);