// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { Box } from '@pkgs/components';

type Props = {
  ...ListItemT,
};

const ListItem = ({
  name,
}: Props): React.Node => {
  const styles = {
    container: {
      borderTop: '1px solid #cccccc',
    },
  };

  return (
    <Box
      style={styles.container}
    >
      {name}
    </Box>
  );
};

export default ListItem;
