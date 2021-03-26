// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import routes from '@pkgs/routes';
import { useFirebase } from '@pkgs/utils';
import { Box } from '@pkgs/components';

export const loginJoinStyles = {
  form: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '500px',
  },
  input: {
    border: '1px solid #e6e6e6',
    borderRadius: '4px',
    margin: '8px 0px',
    outline: 'none',
    padding: '8px',
    width: '100%',
  },
  submitButton: {
    background: '#44AF69',
    border: '1px solid #44AF69',
    borderRadius: '4px',
    color: '#F6F7EB',
    height: '40px',
    margin: '8px 0px',
    width: '100%',
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    paddingLeft: '4px',
    textDecoration: 'none',
    color: '#2191FB',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  error: {
    borderLeft: '4px solid red',
    padding: '8px',
    borderRadius: '4px',
  },
};

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
      style={loginJoinStyles.form}
    >
      <h1>
        Login
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
      <button
        type="submit"
        style={loginJoinStyles.submitButton}
      >
        Login
      </button>
      <Box style={loginJoinStyles.inline}>
        <p>Don&apos;t have an account?</p>
        <Box as={Link} to={routes.join} style={loginJoinStyles.link}>
          Sign Up
        </Box>
      </Box>
    </form>
  );
};

export default Login;
