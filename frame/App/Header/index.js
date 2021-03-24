// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';

import AccountStatus from './AccountStatus';

const Header = (): React.Node => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '50px',
      backgroundColor: 'red',
    },
  };

  return (
    <Box style={styles.container}>
      <Box>
        Two Dew
      </Box>
      <AccountStatus />
    </Box>
  );
};

export default Header;
