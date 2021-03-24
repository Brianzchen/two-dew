// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '@pkgs/routes';

import Join from './Join';
import Login from './Login';
import Main from './Main';

const Body = (): React.Node => {
  const authenticated = false;

  return (
    <Switch>
      <Route exact path={routes.main}>
        {authenticated
          ? (
            <Main />
          )
          : (
            <Redirect to={routes.join} />
          )}
      </Route>
      <Route path={routes.join}>
        <Join />
      </Route>
      <Route path={routes.login}>
        <Login />
      </Route>
    </Switch>
  );
};

export default Body;
