// @flow
import * as React from 'react';

import { useFirebase } from '@pkgs/utils';

const Login = (): React.Node => {
  const firebase = useFirebase();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();

  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    }).catch((err) => {
      console.error(err);
      setError(err?.message);
    });
  };

  return (
    <form
      onSubmit={handleLogin}
    >
      <h1>
        Login
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
        Login
      </button>
    </form>
  );
};

export default Login;
