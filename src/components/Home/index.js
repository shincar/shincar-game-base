import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chat from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';

import { withAuthorization } from '../Session';

const styles = theme => ({
  main: {
    margin: '0px',
    padding: '0px',
    width: '100%',
    height: '100%',
    display: 'block', // Fix IE 11 issue.
  },
  paper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'left',
  },
  typography: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit* 5,
    right: theme.spacing.unit,
  },
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h3" variant="h3" gutterBottom>
            主畫面
          </Typography>
          <Fab className={classes.fab} color='primary'>
              <Chat />
          </Fab>
        </Paper>
      </main>
    );
  }
}

const condition = authUser => !!authUser;


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withAuthorization(condition),
  withStyles(styles),
)(Home);