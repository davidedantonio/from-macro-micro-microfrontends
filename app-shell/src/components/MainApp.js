import {inject, observer} from "mobx-react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Viewport from "./Viewport";
import {Box} from "@material-ui/core";
import React from "react";
import {appShellStore} from "../store/app-shell.store";
import GlobalSnackbar from "./Snackbar/GlobalSnackbar";
import VueAppContainer from "./vueContainers/VueAppContainer";
import Loading from "./Loading";
import Dashboard from "./Dashboard";

const AppBar = React.lazy(() => import("nav/AppBar"));
const AppDrawer = React.lazy(() => import("nav/AppDrawer"));
const SigninService = React.lazy(() => import("auth/Signin"));
const SignupService = React.lazy(() => import("auth/Signup"));
const UsersService = React.lazy(() => import("users/Users"));
const TicketsService = React.lazy(() => import("tickets/Tickets"));

const MainApp = inject("store")(observer(({store}) => {
  const token = localStorage.getItem('@mf-tickets/token')

  return (
    <React.Fragment>
      <BrowserRouter>
        <Viewport>
          {token ? (
            <Box display="flex" flex={1}>
              <React.Suspense fallback={<Loading />}>
                <React.Fragment>
                  <AppBar appShellStore={store} />
                  <AppDrawer appShellStore={store} />

                  <div style={{ paddingTop: 80, paddingRight: 20, paddingLeft: 20, width: '100%' }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="dashboard/*" element={<Dashboard />} />
                      <Route path="users/*" element={<UsersService appShellStore={store} />} />
                      <Route path="tickets/*" element={<TicketsService appShellStore={store} />} />
                      <Route path="vue/*" element={<VueAppContainer />} />
                      <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                      />
                    </Routes>
                  </div>
                </React.Fragment>
              </React.Suspense>
            </Box>
          ) : (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#CFD8DC' }}>
              <React.Suspense fallback={"Loading"}>
                <Routes>
                  <Route path="/signin" element={<SigninService />} />
                  <Route path="/signup" element={<SignupService />} />
                  <Route
                    path="*"
                    element={<Navigate to="/signin" replace />}
                  />
                </Routes>
              </React.Suspense>
            </div>
          )}
        </Viewport>
      </BrowserRouter>

      {appShellStore.message ? (
        <GlobalSnackbar
          {...appShellStore.message}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={ () => appShellStore.resetMessage() }
        />
      ) : null}
    </React.Fragment>
  )
}));

export default MainApp;