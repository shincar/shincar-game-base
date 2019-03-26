import React from 'react';

import { withAuthorization } from '../Session';

const Home = () => (
  <div>
      <h1>主畫面</h1>
      <p>登入的使用者才能看到這頁</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);