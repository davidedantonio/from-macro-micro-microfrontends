import React from "react";
import {inject, observer} from "mobx-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid, Button, Typography
} from "@material-ui/core";

@inject('store', 'appShellStore')
@observer
class UserInfo extends React.Component {
  deleteUser = async () => {
    const { fullName } = this.props.store.currentUser;

    try {
      await this.props.store.deleteUser();
      this.props.appShellStore.showMessage({
        variant: 'success',
        message: `User ${fullName} created!`
      });
    } catch (e) {
      this.props.appShellStore.showMessage({
        variant: 'error',
        message: e.message
      });
    }
  }

  render () {
    const { currentUser } = this.props.store;

    return (
      <Dialog
        open={currentUser !== null}
      >
        <DialogTitle>User Info</DialogTitle>
        <DialogContent>
          <Grid container direction={'row'}>
            {currentUser ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            onClick={() => this.props.store.resetUserInfo()}>
            Close
          </Button>
          <Button
            color={'secondary'}
            onClick={this.deleteUser}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UserInfo;