// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useSelector } from '@core/store';
import routes from '@pkgs/routes';

import Join from './Join';
import Login from './Login';
import Main from './Main';

const Body = (): React.Node => {
  const authenticated = useSelector((state) => state.app.authenticated);

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
        {authenticated
          ? (
            <Redirect to={routes.main} />
          )
          : (
            <Join />
          )}
      </Route>
      <Route path={routes.login}>
        {authenticated
          ? (
            <Redirect to={routes.main} />
          )
          : (
            <Login />
          )}
      </Route>
    </Switch>
  );
};

export default Body;
