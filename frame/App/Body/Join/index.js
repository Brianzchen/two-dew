// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button } from '@pkgs/components';
import routes from '@pkgs/routes';
import { useFirebase } from '@pkgs/utils';

import { loginJoinStyles } from '../Login';

const Join = (): React.Node => {
  const firebase = useFirebase();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    }).catch((err) => {
      console.error(err);
      setError(err?.message);
    });
  };

  return (
    <form
      onSubmit={handleCreateAccount}
      style={loginJoinStyles.form}
    >
      <h1>
        Join
      </h1>
      <input
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        style={loginJoinStyles.input}
        type="email"
        autoComplete="username"
      />
      <input
        value={password}
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        style={loginJoinStyles.input}
        type="password"
        autoComplete="current-password"
      />
      {error && (
        <Box style={loginJoinStyles.error}>
          {error}
        </Box>
      )}
      <Button
        type="submit"
        style={loginJoinStyles.submitButton}
      >
        Create Account
      </Button>
      <Box style={loginJoinStyles.inline}>
        <p>Already have an account?</p>
        <Box as={Link} to={routes.login} style={loginJoinStyles.link}>
          Login
        </Box>
      </Box>
    </form>
  );
};

export default Join;
