// @flow
import * as React from 'react';

import { Button, ClickAwayListener } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  listId: string,
  onListDeletion: (listId: string) => void,
};

const DeleteList = ({
  listId,
  onListDeletion,
}: Props): React.Node => {
  const { auth, firestore } = useFirebase();

  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [owned, setOwned] = React.useState(false);

  React.useEffect(() => {
    const { currentUser } = auth();
    if (currentUser) {
      firestore().collection('lists').doc(listId).get()
        .then((snapshot) => {
          const data = snapshot.data();
          if (data.owner === currentUser.uid) {
            setOwned(true);
          } else {
            setOwned(false);
          }
        });
    }
  }, [listId]);

  const handleDelete = () => {
    firestore().collection('lists').doc(listId).delete()
      .then(() => {
        onListDeletion(listId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!owned) return null;

  return (
    <ClickAwayListener
      onClickAway={() => {
        confirmDelete && setConfirmDelete(false);
      }}
    >
      <div>
        <Button
          onClick={() => {
            setConfirmDelete(true);
          }}
        >
          Delete list
        </Button>
        {confirmDelete && (
          <Button
            onClick={handleDelete}
          >
            yes delete
          </Button>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default DeleteList;
