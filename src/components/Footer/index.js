import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

function Footer(props) {
  const { classes } = props;
  
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Copyright @ Adam & Alvin's Fun Lab
      </Typography>
    </footer>
  )
}

export default withStyles(styles)(Footer)