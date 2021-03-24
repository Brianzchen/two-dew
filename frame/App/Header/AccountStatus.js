// @flow
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { app, useSelector } from '@core/store';
import routes from '@pkgs/routes';
import { useFirebase } from '@pkgs/utils';

const AccountStatus = (): React.Node => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.app.authenticated);

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      dispatch(app.actions.setAuthenticated(false));
    });
  };

  if (authenticated) {
    return (
      <button
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      to={routes.login}
    >
      Login
    </Link>
  );
};

export default AccountStatus;
