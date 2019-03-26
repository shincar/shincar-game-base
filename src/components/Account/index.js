import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

const AccountPage = () => (
   <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>帳號資訊</h1>
        <div>
          使用者名稱： {authUser.username} <br />
          電子郵件: {authUser.email} <br />
        </div>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);