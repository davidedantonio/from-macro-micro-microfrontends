import React from "react";
import {inject, observer} from "mobx-react";
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

@inject('store', 'appShellStore')
@observer
class UsersWidget extends React.Component {
  state = {
    loading: false
  }

  async componentDidMount() {
    const { store, appShellStore } = this.props;

    try {
      this.setState({ loading: true })
      await store.loadUsersCount()
    } catch (e) {
      appShellStore.showMessage({
        variant: 'error',
        message: e.message
      })
    } finally {
      this.setState({ loading: false })
    }
  }

  render () {
    const { count } = this.props.store;
    const { loading } = this.state;

    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Users
          </Typography>
          <Typography variant="h5" component="h2">
            {loading ? <CircularProgress /> : count}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default UsersWidget;