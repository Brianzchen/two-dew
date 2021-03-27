// @flow
import * as React from 'react';

import { useFirebase } from '@pkgs/utils';

import type { ListT } from '.';

type Props = {
  addList: (list: ListT) => void,
};

const NewList = ({
  addList,
}: Props): React.Node => {
  const firebase = useFirebase();

  const [name, setName] = React.useState('');

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
          addList(snapshot.data());
          setName('');
        });
      });
    }
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <button
        type="button"
        onClick={handleCreateList}
        disabled={!name}
      >
        Create New List
      </button>
    </div>
  );
};

export default NewList;
