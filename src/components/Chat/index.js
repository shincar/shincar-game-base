import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import MessageList from './MessegeList';
import MessageSendForm from './MessageSendForm';

const styles = ({
  root: {
    width: '100%',
    height: '100%',
    display: 'grid', // Fix IE 11 issue.
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 60px',
    gridTemplateAreas: "'l' 'l' 'l' 'l' 'l' 'l' 'l' 'c'",
  },
  messageList: {
    gridArea: 'l',
  },
  messageSendForm: {
    gridArea: 'c',
  },
});

class ChatControl extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.messageList} >
            <MessageList />
        </div>
        <div className={classes.messageSendForm}>
            <MessageSendForm />
        </div>
      </div>
    );
  }
}

ChatControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
)(ChatControl);