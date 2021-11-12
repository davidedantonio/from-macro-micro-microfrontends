import React from "react";
import {inject, observer} from "mobx-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid, Button, Typography
} from "@material-ui/core";

const UserInfo = ({
  store,
  appShellStore
}) => {
  const { currentUser } = store;

  const deleteUser = async () => {
    const { fullName } = currentUser;

    try {
      await store.deleteUser();
      appShellStore.showMessage({
        variant: 'success',
        message: `User ${fullName} created!`
      });
    } catch (e) {
      appShellStore.showMessage({
        variant: 'error',
        message: e.message
      });
    }
  }

  return (
    <Dialog
      maxWidth='md'
      open={currentUser !== null}
    >
      <DialogTitle>User Info</DialogTitle>
      <DialogContent>
        <Grid container direction={'row'}>
          {currentUser ? (
            <Grid container>
              <Grid item xs={4}>
                <Typography><strong>Username</strong></Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  {currentUser.username}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography><strong>Full Name</strong></Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  {currentUser.fullName}
                </Typography>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color={'primary'}
          onClick={() => store.resetUserInfo()}>
          Close
        </Button>
        <Button
          color={'secondary'}
          onClick={() => deleteUser()}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default inject('store', 'appShellStore')(observer(UserInfo));