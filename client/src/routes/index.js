import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';

import Signup from './Signup';
import Login from './Login';

export default () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </NativeRouter>
);
