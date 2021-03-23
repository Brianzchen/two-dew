// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';

const Header = (): React.Node => {
  const styles = {
    container: {
      height: '50px',
      backgroundColor: 'red',
    },
  };

  return (
    <Box style={styles.container}>
      Two Dew
    </Box>
  );
};

export default Header;
