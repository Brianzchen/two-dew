// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';

import Body from './Body';
import Header from './Header';

const App = (): React.Node => (
  <Box>
    <Header />
    <Body />
  </Box>
);

export default App;
