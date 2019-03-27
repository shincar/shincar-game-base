import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../Firebase';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  typography: {
    margin: theme.spacing.unit,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
          <Typography component="h3" variant="h3" gutterBottom>
            使用者資訊
          </Typography>
          {loading && <Typography className={classes.typography}>載入中 ...</Typography>}
          {user && (
            <div>
              <Typography className={classes.typography} variant="body1">
                使用者識別: {user.uid}
              </Typography>
              <Typography className={classes.typography} variant="body1">
                使用者名稱: {user.username}
              </Typography>
              <Typography className={classes.typography} variant="body1">
                電子郵件信箱: {user.email}
              </Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSendPasswordResetEmail}
              >
                寄出重設密碼郵件
              </Button>
            </div>
          )}
          </Paper>
        </main>
      </div>
    );
  }
}

UserItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withFirebase,
  withStyles(styles),
)(UserItem);