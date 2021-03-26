// @flow
import * as React from 'react';

import { useFirebase } from '@pkgs/utils';

import ListTodo from './ListTodo';
import NewList from './NewList';

const Main = (): React.Node => {
  const { auth, firestore } = useFirebase();

  const [lists, setLists] = React.useState([]);

  const handleAddNewListItem = (list) => {
    setLists((pLists) => [
      ...pLists,
      list,
    ]);
  };

  // Get all lists belonging to owner
  React.useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      firestore().collection('lists').where('owner', '==', user.uid).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            handleAddNewListItem(doc.data());
          });
        });
    }
  }, []);

  return (
    <>
      <NewList addList={handleAddNewListItem} />
      <ListTodo />
      {JSON.stringify(lists)}
    </>
  );
};

export default Main;
