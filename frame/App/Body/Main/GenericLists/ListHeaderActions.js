// @flow
import * as React from 'react';

import { Box, Button } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

import type { ListT } from '@core/types';

type Props = {
  addList: (list: ListT) => void,
};

const ListHeaderActions = ({
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
    headerContainer: {
      borderBottom: '1px solid #4F1B1B',
      margin: '0px 8px 0px',
      width: '100%',
      display: 'flex',
    },
    container: {
      display: 'flex',
    },
    inputContainer: {
      display: 'flex',
      background: '#FDFAFA',
      border: '1px solid #949494',
      borderRadius: '4px',
      padding: '0px 4px',
      width: 'max-content',
    },
    input: {
      background: 'none',
      border: 'none',
    },
    selector: {
      background: '#C85F5F',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
    },
    headerFont: {
      color: '#4F1B1B',
      display: 'inline-block',
      letterSpacing: -1,
      margin: '0 12px',
      padding: 0,
    },
  };

  return (
    <Box
      style={styles.headerContainer}
    >
      <h2 style={styles.headerFont}>Lists.</h2>
      <Button
        onClick={() => setOpenNewListInput(!openNewListInput)}
      >
        +
      </Button>
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
          <Button
            onClick={handleCreateList}
            disabled={!name}
          >
            Create New List
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ListHeaderActions;
