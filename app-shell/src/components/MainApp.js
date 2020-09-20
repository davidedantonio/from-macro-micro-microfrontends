import {inject, observer} from "mobx-react";
import {ServiceProvider} from "./Service";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Viewport from "./Viewport";
import {Box} from "@material-ui/core";
import React from "react";
import {appShellStore} from "../store/app-shell.store";
import GlobalSnackbar from "./Snackbar/GlobalSnackbar";
import {localStorageSync} from "./localStorageSync";
import VueAppContainer from "./vueContainers/VueAppContainer";

const AppBar = React.lazy(() => import("nav/AppBar"));
const AppDrawer = React.lazy(() => import("nav/AppDrawer"));
const SigninService = React.lazy(() => import("auth/Signin"));
const SignupService = React.lazy(() => import("auth/Signup"));
const UsersService = React.lazy(() => import("users/Users"));
const TicketsService = React.lazy(() => import("tickets/Tickets"));

function useDrawer() {
  const { value, setItem } = localStorageSync(
    "@mf-tickets/drawer"
  );

  return {
    open: value,
    closeDrawer() {
      setItem(false);
    },
    openDrawer() {
      setItem(true);
    },
  };
}

const MainApp = inject("store")(observer(({store}) => {
  const drawer = useDrawer();
  const token = localStorage.getItem('@mf-tickets/token')

  return (
    <React.Fragment>
      <ServiceProvider>
        <BrowserRouter>
          <Viewport>
            {token ? (
              <Box display="flex" flex={1}>
                <React.Suspense fallback={"Loading"}>
                  <React.Fragment>
                    <AppBar drawer={drawer} appShellStore={store} />
                    <AppDrawer drawer={drawer} appShellStore={store} />
                    
                    <div style={{ paddingTop: 80, paddingRight: 20, paddingLeft: 20, width: '100%' }}>
                      <Routes>
                        <Route path="/" element={<span style={{ marginTop: 100 }}>Dashboard</span>} />
                        <Route path="dashboard/*" element={<span>Dashboard</span>} />
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
      </ServiceProvider>

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