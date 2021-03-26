// @flow
import * as React from 'react';

import { useFirebase } from '@pkgs/utils';

const NewList = (): React.Node => {
  const firebase = useFirebase();

  const [name, setName] = React.useState('');

  const handleCreateList = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase.firestore().collection('lists').add({
        name,
        owner: user.uid,
        sharedWith: [],
        type: 'bulk',
      }).then((docRef) => {
        // Doesn't work yet because of user permissions
        console.log(docRef);
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
