import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withAuthorization } from '../Session';

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
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
          <Typography component="h3" variant="h3" gutterBottom>
            主畫面
          </Typography>
          </Paper>
        </main>
      </div>
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