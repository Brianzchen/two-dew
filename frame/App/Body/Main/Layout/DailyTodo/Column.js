// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';

const mapValueToDay = (value) => {
  switch (value) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
};

type Props = {
  children?: React.Node,
  day: number,
};

const Column = ({
  children = null,
  day,
}: Props): React.Node => {
  const style = {
    flex: 1,
  };

  return (
    <Box style={style}>
      <div>
        {mapValueToDay(day)}
      </div>
      {children}
    </Box>
  );
};

export default Column;
