// @flow
import * as React from 'react';

import { Box, ClickAwayListener } from '@pkgs/components';

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
  day?: number,
  title?: string,
};

const Column = ({
  children = null,
  day,
  title = '',
}: Props): React.Node => {
  const [activeColumn, setActiveColumn] = React.useState(false);
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
      border: `1px solid ${isToday || activeColumn ? '#C35050' : '#cccccc'}`,
      borderRadius: '4px',
      backgroundColor: '#F0F0F0',
      margin: '4px',
      minWidth: '200px',
    },
    header: {
      padding: '8px',
      borderRadius: '2px 2px 0px 0px',
      fontSize: '20px',
      fontWeight: 600,
      ...(isToday || (activeColumn && !day)) && {
        backgroundColor: '#C35050',
        color: 'white',
      },
    },
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setActiveColumn(false);
      }}
    >
      <Box
        style={styles.container}
        onClick={() => {
          setActiveColumn(true);
        }}
      >
        <Box style={styles.header}>
          {title === '' ? mapValueToDay(day) : title}
        </Box>
        {children}
      </Box>
    </ClickAwayListener>
  );
};

export default Column;
