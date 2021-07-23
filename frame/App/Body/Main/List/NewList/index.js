// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { Box } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  addList: (list: ListT) => void,
  open: boolean,
};

const NewList = ({
  open,
  addList,
}: Props): React.Node => {
  const firebase = useFirebase();

  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('list');

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

  const handleCreateList = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore().collection('lists');

    if (user) {
      db.add(({
        name,
        owner: user.uid,
        sharedWith: [],
        type,
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

  return open && (
    <Box style={styles.container}>
      <Box style={styles.inputContainer}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          style={styles.input}
        />
        <select
          value={type}
          onChange={(e) => {
            setType(e.currentTarget.value);
          }}
          style={styles.selector}
        >
          <option value="list">
            list
          </option>
          <option value="daily">
            daily
          </option>
        </select>
      </Box>
      <button
        type="button"
        onClick={handleCreateList}
        disabled={!name}
      >
        Create New List
      </button>
    </Box>
  );
};

export default NewList;
