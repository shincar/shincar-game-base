import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    minWidth: 700,
    flexDirection: 'column',
    alignItems: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  typography: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 700,
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

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
          <Typography component="h3" variant="h3" gutterBottom>
            使用者管理
          </Typography>
          {loading && <Typography className={classes.typography}>載入中 ...</Typography>}
          <Table className={classes.table}>
            <TableHead>
            <TableRow>
              <TableCell>使用者識別</TableCell>
              <TableCell align="left">使用者名稱</TableCell>
              <TableCell align="left">電子郵件信箱</TableCell>
              <TableCell align="left">詳細資料</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.uid}
                </TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">
                  <Link
                    to={{
                      pathname: `${ROUTES.ADMIN}/${user.uid}`,
                      state: { user },
                    }}
                  >
                    詳細資料
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </Paper>
        </main>
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withFirebase,
  withStyles(styles),
)(UserList);