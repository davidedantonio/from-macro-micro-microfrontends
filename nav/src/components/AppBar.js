import React from "react";
import {
  AppBar as MuiAppBar, Button, Grid,
  IconButton,
  withStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import clsx from "clsx";
import { observer, inject } from "mobx-react";

const style = (theme) => ({
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  button: {
    marginTop: 5
  }
});

@inject('appShellStore')
@observer
class AppBar extends React.Component {
  render () {
    const { classes, appShellStore } = this.props;

    return (
    <MuiAppBar
          position="absolute"
          className={clsx(classes.appBar, this.props.appShellStore.drawerOpen && classes.appBarShift)}
        >
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          direction={'row'}
          justify={'space-between'}
          >
          <Grid item xs={6}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => appShellStore.openCloseDrawer()}
              className={clsx(
                classes.menuButton,
                this.props.appShellStore.drawerOpen && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {appShellStore.title}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              color={'inherit'}
              onClick={() => {
                localStorage.removeItem("@mf-tickets/token");
                window.location.href = '/'
              }}
            >Logout</Button>
          </Grid>
        </Grid>

      </Toolbar>
    </MuiAppBar>
    );
  }
}

export default withStyles(style)(AppBar);