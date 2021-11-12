import React, { useState } from "react";
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

const style = {
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
};

const AddTicket = ({
  store,
  appShellStore,
  classes
}) => {
  
  const [ ticket, setTicket ] = useState({
    body: null,
    subject: null
  })

  const closeModal = () => {
    store.closeModal();
    reset();
  }

  const openModal = () => {
    setTicket({
      body: null,
      subject: null
    });

    store.openModal();
  }

  const reset = () => {
    setTicket({
      body: null,
      subject: null
    });
  }

  const saveTicket = async () => {
    try {
      await store.addTicket(ticket)
      appShellStore.showMessage({
        variant: 'success',
        message: `Ticket created!`
      });
      reset();
      closeModal();
    } catch (e) {
      appShellStore.showMessage({
        variant: 'error',
        message: e.message
      });
    }
  }
  
  return (
    <React.Fragment>
      <Fab
        onClick={() => openModal()}
        aria-label={"Add Ticket"}
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
                onChange={e => setTicket(Object.assign(ticket, { subject: e.target.value }))}
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
                onChange={e => setTicket(Object.assign(ticket, { body: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            onClick={() => closeModal()}>
            Close
          </Button>
          <Button
            color={'secondary'}
            onClick={saveTicket}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default inject('store', 'appShellStore')(observer(withStyles(style)(AddTicket)));