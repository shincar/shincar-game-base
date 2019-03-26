import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} /> 
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>首頁</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>主畫面</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>帳號資訊</Link>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ROUTES.ADMIN}>帳號管理</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>首頁</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>登入</Link>
    </li>
  </ul>
);

export default Navigation;