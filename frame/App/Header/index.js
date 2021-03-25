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
    headerText: {
      display: 'inline-flex',
      justifyContent: 'flex-end ',
      width: '50%',
    },
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.headerText}>
        <h1 style={{
          fontSize: '40px', fontWeight: 600, margin: 0, padding: 0,
        }}
        >
          Two
        </h1>
        <h1 style={{
          color: 'white', fontSize: '40px', fontWeight: 600, margin: 0, padding: 0,
        }}
        >
          Dew
        </h1>
      </Box>
      <Box style={styles.headerText}>
        <AccountStatus />
      </Box>

    </Box>
  );
};

export default Header;
