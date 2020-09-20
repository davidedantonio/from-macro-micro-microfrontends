import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import {Alert} from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import orange from '@material-ui/core/colors/orange'
import white from '@material-ui/core/colors/grey'

const danger = {
  main: red[500],
  textContrast: white[50]
}
const info = {
  main: blue[500],
  textContrast: white[50]
}
const success = {
  main: green[500],
  textContrast: white[50]
}
const warning = {
  main: orange[500],
  textContrast: white[50]
}

const style = theme => ({
  success: {
    backgroundColor: success.main,
    color: success.textContrast
  },
  error: {
    backgroundColor: danger.main,
    color: danger.textContrast
  },
  info: {
    backgroundColor: info.main,
    color: info.textContrast
  },
  warning: {
    backgroundColor: warning.main,
    color: warning.textContrast
  },
  icon: {
    fontSize: 20,
    color: 'inherit'
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1)
  }
})

class GlobalSnackbar extends React.Component {
  
  handleClose = () => {
    this.setState({ open: false })

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  componentDidMount () {
    if (this.props.open) {
      this.setState({ open: this.props.open })
    } else {
      this.setState({ open: true })
    }
  }

  render () {
    const {
      variant,
      message,
      anchorOrigin,
      onClose
    } = this.props

    const open = (this.state && this.state.open) ? this.state.open : null

    return (
      <Snackbar
        open={open}
        onClose={this.handleClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert onClose={onClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
    )
  }
}

GlobalSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  message: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default withStyles(style)(GlobalSnackbar)
