// @flow
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from '@core/store';
import { Button } from '@pkgs/components';
import routes from '@pkgs/routes';
import { useFirebase } from '@pkgs/utils';

const AccountStatus = (): React.Node => {
  const firebase = useFirebase();
  const authenticated = useSelector((state) => state.app.authenticated);
  const location = useLocation();
  const currentlyOnLogin = location.pathname === routes.login;

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const buttonStyle = {
    color: '#4F1B1B',
    marginRight: '8px',
    marginTop: 'auto',
    marginBottom: 'auto',
    border: '1px solid',
    borderRadius: 16,
    padding: '4px 24px',
    height: 'max-content',
    textDecoration: 'none',
  };

  if (authenticated) {
    return (
      <Button
        onClick={handleLogout}
        style={buttonStyle}
      >
        Logout
      </Button>
    );
  }

  return (
    <Link
      to={currentlyOnLogin ? routes.join : routes.login}
      style={buttonStyle}
    >
      {currentlyOnLogin ? 'Join' : 'Login'}
    </Link>
  );
};

export default AccountStatus;
