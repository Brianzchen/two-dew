// @flow
import * as React from 'react';

import { ClickAwayListener } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  listId: string,
  onListUpdate: (listId: string, updates: { ... }) => void,
};

const Rename = ({
  listId,
  onListUpdate,
}: Props): React.Node => {
  const firebase = useFirebase();

  const [showInput, setShowInput] = React.useState(false);
  const [name, setName] = React.useState('');

  const handleNameChange = (e) => {
    e.preventDefault();

    const updates = {
      name,
    };

    firebase.firestore().collection('lists').doc(listId).update(updates)
      .then(() => {
        setShowInput(false);
        onListUpdate(listId, updates);
      });
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowInput(false);
      }}
    >
      <div>
        <button
          type="button"
          onClick={() => {
            setShowInput(true);
          }}
        >
          Rename
        </button>
        {showInput && (
          <form onSubmit={handleNameChange}>
            <input
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
            />
            <button type="submit">
              Update
            </button>
          </form>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Rename;
