// @flow
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { app } from '@core/store';
import { Box } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

import Body from './Body';
import Header from './Header';

const App = (): React.Node => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(app.actions.setAuthenticated(!!user));
      !loaded && setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return (
      <div>
        loading
      </div>
    );
  }

  return (
    <Box
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Body />
    </Box>
  );
};

export default App;
