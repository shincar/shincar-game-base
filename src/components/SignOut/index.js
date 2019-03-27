import React from 'react';
import Button from '@material-ui/core/Button';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button color="inherit" onClick={firebase.doSignOut}>
    登出
  </Button>
);

export default withFirebase(SignOutButton);