// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Join from './Join';
import Login from './Login';
import Main from './Main';

const Body = (): React.Node => {
  const authenticated = false;

  return (
    <Switch>
      <Route exact path="/">
        {authenticated
          ? (
            <Main />
          )
          : (
            <Redirect to="/join" />
          )}
      </Route>
      <Route path="/join">
        <Join />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

export default Body;
