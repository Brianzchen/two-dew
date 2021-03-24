// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import routes from '@pkgs/routes';
import { useFirebase } from '@pkgs/utils';

const Join = (): React.Node => {
  const firebase = useFirebase();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.error(err);
      setError(err?.message);
    });
  };

  return (
    <form
      onSubmit={handleCreateAccount}
    >
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        type="email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        type="password"
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
