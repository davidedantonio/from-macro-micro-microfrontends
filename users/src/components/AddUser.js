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
import { Alert } from "@material-ui/lab";

const style = {
  fab: {
    position: 'absolute !important',
    bottom: 20,
    right: 20,
  }
};

const AddUser = ({
  classes,
  appShellStore,
  store
}) => {

  const [ open, isOpen ] = useState(false)
  const [ user, setUser ] = useState({
    username: null,
    password: null,
    fullName: null
  })
  
  const closeModal = () => {
    isOpen(false);
    reset();
  }

  const openModal = () => {
    reset()
    isOpen(true)
  }

  const reset = () => {
    setUser({
      username: null,
      password: null,
      fullName: null
    })
  }

  const saveUser = async () => {
    try {
      await store.addUser(user)
      appShellStore.showMessage({
        variant: 'success',
        message: `User ${user.fullName} created!`
      });
      closeModal();
    } catch (e) {
      appShellStore.showMessage({
        variant: 'error',
        message: e.message
      })
    }
  }

  return (
    <React.Fragment>
      <Fab
        onClick={() => openModal()}
        aria-label={"Add User"}
        className={classes.fab}
        color={'primary'}>
        <Add />
      </Fab>

      <Dialog
        open={open}
        maxWidth={'sm'}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Grid container direction={'row'} spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="fullName"
                label="Full Name"
                variant="filled"
                fullWidth
                onChange={e => setUser(Object.assign(user, { fullName: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="username"
                label="Username"
                variant="filled"
                fullWidth
                onChange={e => setUser(Object.assign(user, { username: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="password"
                type={'password'}
                label="Password"
                variant="filled"
                fullWidth
                onChange={e => setUser(Object.assign(user, { password: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            onClick={closeModal}>
            Close
          </Button>
          <Button
            color={'secondary'}
            onClick={saveUser}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default inject('store', 'appShellStore')(observer(withStyles(style)(AddUser)));