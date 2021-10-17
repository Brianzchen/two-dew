// @flow
import * as React from 'react';

import {
  Box,
  Button,
  ClickAwayListener,
  Modal,
} from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  title?: string,
  showCompleted?: boolean,
  setShowCompleted?: ((boolean => boolean) | boolean) => void,
  showFlagged: boolean,
  setShowFlagged?: ((boolean =>boolean) | boolean) => void,
  listId: string,
  onListDeletion?: (listId: string) => void,
};

const ListActions = ({
  title,
  showCompleted = false,
  setShowCompleted,
  showFlagged = false,
  setShowFlagged,
  listId,
  onListDeletion,
}: Props): React.Node => {
  const { firestore } = useFirebase();

  const [activeColumn, setActiveColumn] = React.useState(false);
  const [openListActions, setOpenListActions] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleDelete = () => {
    firestore().collection('lists').doc(listId).delete()
      .then(() => {
        onListDeletion && onListDeletion(listId);
        setConfirmDelete(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const styles = {
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
      color: '#4F1B1B',
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
    <>
      <ClickAwayListener
        onClickAway={() => {
          setActiveColumn(false);
        }}
      >
        <Box style={styles.listActions}>
          <Button
            onClick={() => { setOpenListActions(true); }}
          >
            ...
          </Button>
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
                  Show Completed
                </div>
                <div>
                  <input
                    value={showFlagged}
                    onChange={() => {
                      setShowFlagged && setShowFlagged((pshowFlagged) => !pshowFlagged);
                    }}
                    type="checkbox"
                  />
                  Filter Priority
                </div>
                <Button
                  onClick={() => setConfirmDelete(true)}
                  style={{
                    borderTop: '1px solid #949494',
                    width: '100%',
                    textAlign: 'left',
                    color: '#C35050',
                  }}
                >
                  Delete List
                </Button>
              </Box>
            </ClickAwayListener>
          )}
        </Box>
      </ClickAwayListener>
      <Modal open={confirmDelete} style={styles.deleteModal}>
        {`Are you sure you want to delete ${title ?? 'this daily'} list?`}
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '12px',
          }}
        >
          <Button
            style={styles.deleteButton}
            onClick={handleDelete}
          >
            {`Yes, delete ${title ?? 'this daily'} list`}
          </Button>
          <Button
            style={styles.cancelButton}
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ListActions;
