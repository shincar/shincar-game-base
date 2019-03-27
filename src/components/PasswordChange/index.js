import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Cloud from '@material-ui/icons/Cloud';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../Firebase';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangePageBase extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Cloud />
          </Avatar>
          <Typography component="h1" variant="h5">
            重設密碼
          </Typography>
          <PasswordChangeForm classes={classes} />
        </Paper>
      </main>
    )
  }
}

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    event.preventDefault();
    
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const { classes } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordOne">新密碼</InputLabel>
              <Input id="passwordOne" name="passwordOne" type="password" autoComplete="password" autoFocus 
                     value={passwordOne}
                     onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordTwo">確認新密碼</InputLabel>
              <Input id="passwordTwo" name="passwordTwo" type="password" autoComplete="password" autoFocus 
                     value={passwordTwo}
                     onChange={this.onChange}
              />
            </FormControl>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid} 
            >
              重設密碼
            </Button>

            {error && <p>{error.message}</p>}
          </form>
    );
  }
}

PasswordChangePageBase.propTypes = {
  classes: PropTypes.object.isRequired,
}

PasswordChangeFormBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const PasswordChangeForm = compose(
  withFirebase,
  withStyles(styles),
)(PasswordChangeFormBase)

const PasswordChangePage = compose(
  withFirebase,
  withStyles(styles),
)(PasswordChangePageBase)

export default PasswordChangePage;

export { PasswordChangeForm, PasswordChangeFormBase };