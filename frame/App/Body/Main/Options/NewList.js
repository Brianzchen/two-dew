// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { useFirebase } from '@pkgs/utils';

type Props = {
  addList: (list: ListT) => void,
};

const NewList = ({
  addList,
}: Props): React.Node => {
  const firebase = useFirebase();

  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('list');

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

  return (
    <div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <select
        value={type}
        onChange={(e) => {
          setType(e.currentTarget.value);
        }}
      >
        <option value="list">
          list
        </option>
        <option value="daily">
          daily
        </option>
      </select>
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
