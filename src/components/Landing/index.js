import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import ChatControl from '../Chat';

const styles = theme => ({
  main: {
    margin: '0px',
    padding: '0px',
    width: '100%',
    height: '100%',
    display: 'block', // Fix IE 11 issue.
  },
  landing: {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr',
    gridTemplateAreas: "'l' 'c'", 
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      gridTemplateRows: '1fr',
      gridTemplateAreas: "'l' 'c' 'c' 'c' 'c' 'c' 'c'", 
    },
  },
  lobby: {
    gridArea: 'l',
  },
  chatroom: {
    gridArea: 'c',
  }
});

class Landing extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.landing}>
          <Typography className={classes.lobby} component="h3" variant="h3">
            遊戲大廳
          </Typography>
          <ChatControl className={classes.chatroom} />
        </Paper>
      </main>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
)(Landing);