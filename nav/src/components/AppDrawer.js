import React from "react";
import {
  withStyles,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  People as UsersIcon,
  ConfirmationNumber as TicketsIcon,
  Ballot as BallotIcon
} from "@material-ui/icons";
import clsx from "clsx";

import { Link, useMatch } from "react-router-dom";
import {inject, observer} from "mobx-react";

const styles = (theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  menuIcon: {
    width: '1.5em'
  }
});

const ListItemLink = props => {
  const selected = useMatch(props.to);
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={props.to} {...linkProps} />
      )),
    [props.to]
  );

  return (
    <li>
      <ListItem selected={selected !== null} button component={CustomLink}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </li>
  );
}

const AppDrawer = ({ classes, appShellStore }) => {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !appShellStore.drawerOpen && classes.drawerPaperClose
        ),
      }}
      open={appShellStore.drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => appShellStore.openCloseDrawer()}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItemLink to="tickets" icon={<TicketsIcon className={classes.menuIcon} />} text="Tickets" />
        <ListItemLink to="users" icon={<UsersIcon className={classes.menuIcon} />} text="Users" />
        <ListItemLink to="vue" icon={<BallotIcon className={classes.menuIcon} />} text="Vue" />
      </List>
    </Drawer>
  );
}

export default inject('appShellStore')(observer(withStyles(styles)(AppDrawer)));
