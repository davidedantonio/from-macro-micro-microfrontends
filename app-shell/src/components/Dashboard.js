import React from "react";
import {Container, Grid} from "@material-ui/core";
import Loading from "./Loading";
import {inject} from "mobx-react";

const UsersWidget = React.lazy(() => import('users/UsersWidget'))

inject('store')
class Dashboard extends React.Component {
  render () {
    return (
      <Container maxWidth={'md'}>
        <Grid container direction={'row'}>
          <Grid item xs={12} md={6}>
            <React.Suspense fallback={<Loading />}>
              <UsersWidget appShellStore={this.props.store} />
            </React.Suspense>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Dashboard;