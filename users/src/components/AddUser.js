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
    position: 'absolute !important',
    bottom: 20,
    right: 20,
  }
};

@inject('store', 'appShellStore')
@observer
class AddUser extends React.Component {
  state = {
    user: {
      username: null,
      password: null,
      fullName: null
    },
    open: false
  }

  closeModal = () => {
    this.setState({ open: false });
    this.reset();
  }

  openModal = () => {
    this.setState({
      user: {
        username: null,
        password: null,
        fullName: null
      },
      open: true
    });
  }

  reset = () => {
    this.setState({
      user: {
        username: null,
        password: null,
        fullName: null
      }
    });
  }

  saveUser = async () => {
    try {
      await this.props.store.addUser(this.state.user)
      this.props.appShellStore.showMessage({
        variant: 'success',
        message: `User ${this.state.user.fullName} created!`
      });
      this.closeModal();
    } catch (e) {
      this.props.appShellStore.showMessage({
        variant: 'error',
        message: e.message
      })
    }
  }

  render () {
    const { open } = this.state;
    const { classes } = this.props;

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
                  onChange={e => this.setState({ user: Object.assign(this.state.user, { fullName: e.target.value }) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="username"
                  label="Username"
                  variant="filled"
                  fullWidth
                  onChange={e => this.setState({ user: Object.assign(this.state.user, { username: e.target.value }) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="password"
                  type={'password'}
                  label="Password"
                  variant="filled"
                  fullWidth
                  onChange={e => this.setState({ user: Object.assign(this.state.user, { password: e.target.value }) })}
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
              onClick={this.saveUser}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(AddUser);