// @flow
import * as React from 'react';

import { useFirebase } from '@pkgs/utils';
import { Box } from '@pkgs/components';

import DailyLists from './DailyLists';
import GenericLists from './GenericLists';

export type LayoutT = Array<{
  data: Array<string>,
}>;

const Main = (): React.Node => {
  const { auth, firestore } = useFirebase();
  const user = auth().currentUser;

  const [genericLists, setGenericLists] = React.useState([]);
  const [dailyLists, setDailyLists] = React.useState([]);

  const handleAddGenericList = (list) => {
    setGenericLists((pLists) => [
      ...pLists,
      list,
    ]);
  };

  const handleAddDailyList = (list) => {
    setDailyLists((pLists) => [
      ...pLists,
      list,
    ]);
  };

  const handleListDeletion = (listId: string) => {
    setGenericLists((pLists) => pLists.filter((o) => o.id !== listId));
    setDailyLists((pLists) => pLists.filter((o) => o.id !== listId));
  };

  React.useEffect(() => {
    if (user) {
      // Get all lists belonging to owner
      firestore().collection('lists').where('owner', '==', user.uid).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.type === 'daily') {
              handleAddDailyList({
                ...doc.data(),
                id: doc.id,
              });
            } else if (data.type === 'list') {
              handleAddGenericList({
                ...doc.data(),
                id: doc.id,
              });
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return dailyLists.length > 0 && (
    <Box
      style={{
        maxWidth: '100%',
        height: '100%',
        margin: '0px 8px',
      }}
    >
      <DailyLists
        onListDeletion={handleListDeletion}
        handleAddNewList={handleAddDailyList}
        dailyLists={dailyLists}
      />
      <GenericLists
        onListDeletion={handleListDeletion}
        handleAddNewList={handleAddGenericList}
        genericLists={genericLists}
      />
    </Box>
  );
};

export default Main;
