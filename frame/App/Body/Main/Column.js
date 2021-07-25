// @flow
import * as React from 'react';

import { Box, ClickAwayListener, Modal } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

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
  listId: string,
  onListDeletion: (listId: string) => void,
};

const Column = ({
  children = null,
  day,
  title = '',
  showCompleted = false,
  setShowCompleted,
  listId,
  onListDeletion,
}: Props): React.Node => {
  const { firestore } = useFirebase();

  const [activeColumn, setActiveColumn] = React.useState(false);
  const [openListActions, setOpenListActions] = React.useState(false);
  const [isToday, setIsToday] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleDelete = () => {
    firestore().collection('lists').doc(listId).delete()
      .then(() => {
        onListDeletion(listId);
        setConfirmDelete(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
            <Box style={styles.listActions}>
              <button
                type="button"
                onClick={() => { setOpenListActions(true); }}
              >
                ...
              </button>
              {openListActions && (
                <ClickAwayListener
                  onClickAway={() => setOpenListActions(false)}
                >
                  <Box style={styles.dropdownActions}>
                    <div>
                      <input
                        value={showCompleted}
                        onChange={() => {
                          setShowCompleted && setShowCompleted((pShowCompleted) => !pShowCompleted);
                        }}
                        type="checkbox"
                      />
                      show completed
                    </div>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      style={{
                        borderTop: '1px solid #949494',
                        width: '100%',
                        textAlign: 'left',
                        color: '#C35050',
                      }}
                    >
                      Delete List
                    </button>
                  </Box>
                </ClickAwayListener>
              )}
            </Box>
          )}
        </Box>
        {children}
      </Box>
      <Modal open={confirmDelete} style={styles.deleteModal}>
        {`Are you sure you want to delete ${title ?? 'this daily'} list?`}
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '12px',
          }}
        >
          <button
            type="button"
            style={styles.deleteButton}
            onClick={handleDelete}
          >
            {`Yes, delete ${title ?? 'this daily'} list`}
          </button>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </Box>
      </Modal>
    </ClickAwayListener>
  );
};

export default Column;
