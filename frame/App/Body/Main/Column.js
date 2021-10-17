// @flow
import * as React from 'react';

import { Box, ClickAwayListener } from '@pkgs/components';

import ListActions from './components/ListActions';

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
  showCompleted?: boolean,
  setShowCompleted?: ((boolean => boolean) | boolean) => void,
  showFlagged?: boolean,
  setShowFlagged?: ((boolean => boolean) | boolean) => void,
  listId: string,
  onListDeletion?: (listId: string) => void,
};

const Column = ({
  children = null,
  day,
  title = '',
  showCompleted = false,
  setShowCompleted,
  listId,
  onListDeletion,
  showFlagged = false,
  setShowFlagged,
}: Props): React.Node => {
  const [activeColumn, setActiveColumn] = React.useState(false);
  const [isToday, setIsToday] = React.useState(false);

  React.useEffect(() => {
    const handleIsToday = () => setIsToday(new Date().getDay() === day);
    handleIsToday();
    const timeout = setTimeout(handleIsToday, 60000);

    return () => clearTimeout(timeout);
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
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '8px',
      borderRadius: '2px 2px 0px 0px',
      fontSize: '20px',
      fontWeight: 600,
      ...(isToday || (activeColumn && !day)) && {
        backgroundColor: '#C35050',
        color: 'white',
      },
    },
    listActions: {
      justifyContent: 'space-between',
      position: 'relative',
      display: 'inline-block',
      fontSize: '20px',
      fontWeight: 600,
      ...activeColumn && {
        backgroundColor: '#C35050',
        color: 'white',
      },
    },
    dropdownActions: {
      width: '150px',
      borderRadius: '4px',
      position: 'absolute',
      backgroundColor: '#FBF4F4',
      color: '#4F1B1B',
      right: 0,
      boxShadow: '0px 2px 4px 2px',
    },
    deleteModal: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'max-content',
    },
    cancelButton: {
      border: '1px solid #cccccc',
      borderRadius: '4px',
    },
    deleteButton: {
      border: '1px solid #C35050',
      backgroundColor: '#C35050',
      background: '',
      borderRadius: '4px',
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
        onClick={() => { setActiveColumn(true); }}
      >
        <Box style={styles.header}>
          {title === '' ? mapValueToDay(day) : title}
          {typeof day === 'undefined' && (
            <ListActions
              title={title}
              showCompleted={showCompleted}
              setShowCompleted={setShowCompleted}
              listId={listId}
              onListDeletion={onListDeletion}
              showFlagged={showFlagged}
              setShowFlagged={setShowFlagged}
            />
          )}
        </Box>
        {children}
      </Box>
    </ClickAwayListener>
  );
};

export default Column;
