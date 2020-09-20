import React from "react";
import { Grid, Paper, TextField, Button, Typography, withStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import {Link} from "react-router-dom";
const {
  APP_API
} = process.env;

const style = () => ({
  root: {
    marginTop: 200
  },
  paper: {
    padding: 20
  }
});

class Signup extends React.Component {
  state = {
    fullName : '',
    username: '',
    password: '',
    error: '',
    success: ''
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

  signup = async () => {
    const { fullName, username, password } = this.state;
    if (!fullName) {
      this.setState({ error: 'Full name required' });
      return;
    }

    if (!username || !password) {
      this.setState({ error: 'Username and password required' });
      return;
    }

    try {
      await axios.post(`${APP_API}/signup`, {
        fullName: fullName,
        username: username,
        password: password
      });

      this.setState({ success: `User ${this.state.fullName} registered! Please go to Login page to access!` });
    } catch (e) {
      this.setState({ error: e.response.data.message });
    }
  }

  render () {
    const { classes }  = this.props;

    return (
      <Grid 
        container
        direction={"row"}
        justify={"center"}
        alignItems={"center"}
        className={classes.root}
        >
        <Grid item xs={11} md={3}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: "center", padding: 40}}>
              <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABp1BMVEUAAABffItffYtgfYtgfItddItVgIBaeIdggIBgfYtgfYtgfotgfYtidolffo1gfYtgfYtffothfYtffIxgfYxggIxgfopffIoAAP9gfYtgfItgfYtgfYpjgI5ffYxffouAgIBffotffYtgfYtffYtigI9gfYtefYtgfYpgfYtgfYthfYpgfYtgfYthfItefolceo9ffYxhfYpffYtie4xmgIBgfYtgfYpgfYtee45gfYxgfYtgfYpggIdffYxeeYZgfYtgfYxffYhgfIqAgIBjgItgfYxgfYxgfYtqgJVhfYxffYxgfYtgfotmZplgfYtgfYtgfYtgfIphfYtegI1gfYtgfotgfYxifIlhfYpkgIldgIttbZJhfoxffYtffYtegIhdfIlgfYtffI1efoxifY1bgJJhfYxgfYpjgI5gfIthfYthfItgfYphfIpgfYpgfYtgfotkepBgfIpffIpgfItgfopgfotegItffoxgfYtefY1ifItgfYtgfotgfIpgfYtgfYtje4xffIpgfoxgfIthfYthfoxffYpfe4xgfYtgfYsAAAC7oG4pAAAAi3RSTlMAe/uyzwsGEQjQ2Yi9DUP2/GOuc4coVUYB+nfmrxJmhgSWu6VuIvk5YFj4P8zCZ0EZs5mjPAq43cgb3/56IDMT92grSAIsatS0DGR+tU0F7uxyJc4m8ICqJ7EcFgdZ2+MeKfROSS8OvrwkzWx56Gk9cGUXbSOckIouW6wxRNzBpMTVH6aU0Tdfmz7vZp+HBwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCQ4PDhwtENCKAAACfklEQVRYw+XX51/TQBjA8RNldGBLobXgKihVW0CsA0EsFYpYFNCqDHGLe0/EiVt5/mmzSO651eRe6u9d+2m+SS93GYSst6EOuDaSAG0CQfWkoRHXJAVCEI7gogDNm2MMGW+RAwnmm1YDaOMOKqEEkqn1tqQtIALtHXRbYZsK2E4d8A4HiDEjpQSS1KHudIFMZ5fdrkYfwO5uqywF7HHRvT6AffanHAXkAXqM/fcC9GkD+42v+v9z4EChUDioDRxyT2OLHnD4yIDd0UE9gE4DyKbohoIDbAHXQuoYCwzXAJjVSI4XcUmiAkZKHnDCBvxnXZFG3dEaK1tAeSwla1wEoEzgJEjL9rPARAfulPAseBUxILwvVCJQ6hY2yQGn4/z2Zwg7E92mOECcCUxHZ5jOngsEVPlDO08uZC+OuL9Kz86J67OAeYAFdM8LQ4iQS4vebkZl4xy/7ABX0GElTICuCHC1h++as5zFQPU6AqYE/79VBdyou7mIgcotNFGXMmqgmqMG8TbAkvEtrk0NoEFsSHTdMaYybq4GwBWCu9SyH8DAvQLdEDuIDkCvxgkKuM+f3wd4EMnDR2UFkFlgp/LjJ3gqG7t4qgCEIWDaHkQxkCsKe8YtJhng+4IiBp7Lt4+98H7+ctgcxHZqmOIOkM5LL6qvvO2T5gNAL7OD1wEu69ZaGH+DJsvyoA3MM4P3Ni0D+Exghfvrs2LgXYQv6vvm+l460vXGPPhA91EINH2aEfeZBHjAEGcClVXH+/JVD/Aesib1gDzAN2NMv9d4zFMCfh40/3UgbNyofmgDP93T+EsPKC87L12/m/UAOg3A94unuACvvuL+rDHbl1bwD/4CUPKDIYpQescAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDktMTRUMTU6MTQ6MjgrMDA6MDC4xxguAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA5LTE0VDE1OjE0OjI4KzAwOjAwyZqgkgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=' />
            </div>
            <Typography variant={'h6'} component={'h6'}>Signup</Typography>
            <Grid container direction={'row'} spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full name" variant="filled" onChange={e => this.handleChange('fullName', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Username" variant="filled" onChange={e => this.handleChange('username', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField type={'password'} fullWidth label="Password" variant="filled" onChange={e => this.handleChange('password', e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {this.state.error ? (<Alert severity="error">{this.state.error}</Alert>) : null}
                {this.state.success ? (<Alert severity="success">{this.state.success}</Alert>) : null}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" disableElevation fullWidth onClick={this.signup}>
                  Signup
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={Link}
                  variant="contained"
                  color="secondary"
                  disableElevation
                  fullWidth
                  to={"/signin"}>
                  Signin now!
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(Signup);