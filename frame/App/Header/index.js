// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';

import AccountStatus from './AccountStatus';

const Header = (): React.Node => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      height: 'max-content',
    },
    headerText: {
      display: 'inline-flex',
      alignItems: 'baseline',
      justifyContent: 'flex-start ',
      width: '50%',
      marginLeft: '8px',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    headerStatus: {
      display: 'inline-flex',
      justifyContent: 'flex-end ',
      width: '50%',
    },
    headerFont: {
      color: '#4F1B1B',
      letterSpacing: -4,
      fontSize: '40px',
      fontWeight: 600,
      margin: 0,
      padding: 0,
    },
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.headerText}>
        <h1 style={{
          ...styles.headerFont,
        }}
        >
          two
        </h1>
        <h1 style={{
          ...styles.headerFont,
          color: '#C85F5F',
        }}
        >
          dew.
        </h1>
      </Box>
      <Box style={styles.headerStatus}>
        <AccountStatus />
      </Box>

    </Box>
  );
};

export default Header;
