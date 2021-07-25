// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

import type { ListT } from '@core/types';

import ListActions from '../components/ListActions';

type Props = {
  addList: (list: ListT) => void,
  lists: Array<ListT>,
  setName: (string) => void,
  name: string,
  showCompleted: boolean,
  setShowCompleted: ((boolean => boolean) | boolean) => void,
  onListDeletion: (listId: string) => void,
};

const ListSwitcher = ({
  lists,
  setName,
  addList,
  name,
  showCompleted,
  setShowCompleted,
  onListDeletion,
}: Props): React.Node => {
  const firebase = useFirebase();

  const [newListName, setNewListName] = React.useState('');
  const [listId, setListId] = React.useState(lists[0]?.id ?? '');
  const [openNewListInput, setOpenNewListInput] = React.useState(false);

  const handleCreateList = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore().collection('lists');

    if (user) {
      db.add(({
        name: newListName,
        owner: user.uid,
        sharedWith: [],
        type: 'daily',
      })).then((docRef) => {
        db.doc(docRef.id).get().then((snapshot) => {
          addList({
            ...snapshot.data(),
            id: docRef.id,
          });
          setName(newListName);
          setListId(docRef.id);
          setNewListName('');
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
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        style={{
          display: 'flex',
        }}
      >
        <h3 style={styles.headerFont}>Daily Lists.</h3>
        {lists.map((o) => (
          <button
            key={o.name}
            type="button"
            onClick={() => {
              setName(o.name);
              setListId(o.id);
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
          onClick={() => setOpenNewListInput(!openNewListInput)}
        >
          +
        </button>
        {openNewListInput && (
          <Box style={styles.container}>
            <Box style={styles.inputContainer}>
              <input
                value={newListName}
                onChange={(e) => {
                  setNewListName(e.currentTarget.value);
                }}
                style={styles.input}
              />
            </Box>
            <button
              type="button"
              onClick={handleCreateList}
              disabled={!newListName}
            >
              Create New List
            </button>
          </Box>
        )}
      </Box>
      <ListActions
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        listId={listId}
        onListDeletion={() => {
          onListDeletion(listId);
          setListId('');
          setName('');
        }}
      />
    </Box>
  );
};

export default ListSwitcher;
