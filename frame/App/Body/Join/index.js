// @flow
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { app } from '@core/store';
import routes from '@pkgs/routes';
import { useFirebase } from '@pkgs/utils';

const Join = (): React.Node => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      dispatch(app.actions.setAuthenticated(true));
    }).catch((err) => {
      console.error(err);
      setError(err?.message);
    });
  };

  return (
    <form
      onSubmit={handleCreateAccount}
    >
      <h1>
        Join
      </h1>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        type="email"
        autoComplete="username"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        type="password"
        autoComplete="current-password"
      />
      {error && (
        <div>
          {error}
        </div>
      )}
      <button type="submit">
        Create Account
      </button>
      <Link to={routes.login}>
        go to login
      </Link>
    </form>
  );
};

export default Join;
