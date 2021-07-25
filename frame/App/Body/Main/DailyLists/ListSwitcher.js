// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

import type { ListT } from '@core/types';

type Props = {
  addList: (list: ListT) => void,
  lists: Array<ListT>,
  setName: (string) => void,
  name: string,
};

const ListSwitcher = ({
  lists,
  setName,
  addList,
  name,
}: Props): React.Node => {
  const firebase = useFirebase();

  const [openNewListInput, setOpenNewListInput] = React.useState(false);

  const handleCreateList = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore().collection('lists');

    if (user) {
      db.add(({
        name,
        owner: user.uid,
        sharedWith: [],
        type: 'daily',
      })).then((docRef) => {
        db.doc(docRef.id).get().then((snapshot) => {
          addList({
            ...snapshot.data(),
            id: docRef.id,
          });
          setName(name);
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
      background: '#C35050',
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
    headerFont: {
      color: '#4F1B1B',
      letterSpacing: -1,
      margin: '0 12px',
      padding: 0,
      display: 'inline-block',
    },
  };

  return (
    <Box
      style={{
        borderBottom: '1px solid #4F1B1B',
        width: '100%',
        display: 'inline-block',
      }}
    >
      <h3 style={styles.headerFont}>Daily Lists.</h3>
      {lists.map((o) => (
        <button
          key={o.name}
          type="button"
          onClick={() => {
            setName(o.name);
          }}
          style={name === o.name ? {
            backgroundColor: '#C35050',
            borderBottom: '1px solid #C35050',
            color: 'white',
          } : {}}
        >
          {o.name}
        </button>
      ))}
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
