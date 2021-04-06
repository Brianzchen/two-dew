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
  const [isToday, setIsToday] = React.useState(false);

  React.useEffect(() => {
    const handleIsToday = () => {
      setIsToday(new Date().getDay() === day);
    };
    handleIsToday();
    const timeout = setTimeout(handleIsToday, 60000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const styles = {
    container: {
      flex: 1,
      border: `1px solid ${isToday ? 'red' : '#cccccc'}`,
    },
    header: {
      padding: '8px',
      fontSize: '20px',
      fontWeight: 600,
      ...isToday && {
        backgroundColor: 'red',
        color: 'white',
      },
    },
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        {mapValueToDay(day)}
      </Box>
      {children}
    </Box>
  );
};

export default Column;
