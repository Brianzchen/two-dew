// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  addList: (list: ListT) => void,
};

const ListSwitcher = ({
  addList,
}: Props): React.Node => {
  const firebase = useFirebase();
  const [name, setName] = React.useState('');
  const [openNewListInput, setOpenNewListInput] = React.useState(false);

  const handleCreateList = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore().collection('lists');

    if (user) {
      db.add(({
        name,
        owner: user.uid,
        sharedWith: [],
        type: 'list',
      })).then((docRef) => {
        db.doc(docRef.id).get().then((snapshot) => {
          addList({
            ...snapshot.data(),
            id: docRef.id,
          });
          setName('');
        });
      });
    }
  };
  const styles = {
    container: {
      display: 'flex',
    },
    inputContainer: {
      padding: '0px 4px',
      border: '1px solid #949494',
      borderRadius: '4px',
      width: 'max-content',
      background: '#FDFAFA',
    },
    input: {
      border: 'none',
      background: 'none',
    },
    selector: {
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      background: '#C85F5F',
    },
  };

  return (
    <Box
      style={{
        borderBottom: '1px solid #4F1B1B',
        margin: '0px 8px 0px',
        width: '100%',
        display: 'flex',
      }}
    >
      <button
        type="button"
        onClick={() => {
          setOpenNewListInput(!openNewListInput);
        }}
      >
        +
      </button>
      {openNewListInput && (
        <Box style={styles.container}>
          <Box style={styles.inputContainer}>
            <input
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
              style={styles.input}
            />
          </Box>
          <button
            type="button"
            onClick={handleCreateList}
            disabled={!name}
          >
            Create New List
          </button>
        </Box>
      )}
    </Box>
  );
};

export default ListSwitcher;
