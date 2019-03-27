import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { PasswordChangeFormBase } from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  typography: {
    margin: theme.spacing.unit,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
    },
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class AccountPage extends React.Component {
  render() {
    const { firebase, classes } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Typography component="h3" variant="h3" gutterBottom>
                帳號資訊
              </Typography>
              <Typography className={classes.typography} variant="body1">
                使用者名稱： {authUser.username}
              </Typography>
              <Typography className={classes.typography} variant="body1">
                電子郵件: {authUser.email}
              </Typography>
              <PasswordChangeFormBase classes={classes} firebase={firebase} />
            </Paper>
            </main>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

AccountPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withStyles(styles),
)(AccountPage);