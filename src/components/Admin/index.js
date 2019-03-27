import React, { Component } from 'react';
import { compose } from 'recompose';
import { Switch, Route } from 'react-router-dom';

import { withAuthorization } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

class AdminBase extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
      </div>
    );
  }
}

const condition = authUser => 
  !!authUser && authUser.roles.includes(ROLES.ADMIN);;

export default compose(
  withAuthorization(condition),
)(AdminBase);