import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import HowToRegOutlined from '@material-ui/icons/HowToRegOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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
    marginTop: theme.spacing.unit,
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
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const roles = [];

    event.preventDefault();
    roles.push(ROLES.BASIC);
    
    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log(error);
        if(error.code === "auth/email-already-in-use") 
          error.message = "電子郵件信箱已經註冊過了哦！";
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const { classes } = this.props;
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HowToRegOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            註冊
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">使用者名稱</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus 
                     value={username}
                     onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">電子郵件信箱</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus 
                     value={email}
                     onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordOne">密碼</InputLabel>
              <Input name="passwordOne" type="password" id="passwordOne" autoComplete="current-password" 
                    value={passwordOne}
                    onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordTwo">確認密碼</InputLabel>
              <Input name="passwordTwo" type="password" id="passwordTwo" autoComplete="current-password" 
                    value={passwordTwo}
                    onChange={this.onChange}
              />
            </FormControl>
            <Typography>
            {error && error.message}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid} 
            >
              註冊
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withFirebase,
  withStyles(styles),
)(SignUpPage);