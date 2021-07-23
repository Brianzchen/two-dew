// @flow
import * as React from 'react';

import { useFirebase } from '@pkgs/utils';

import DailyLists from './DailyLists';
import GenericLists from './GenericLists';

export type LayoutT = Array<{
  data: Array<string>,
}>;

const Main = (): React.Node => {
  const { auth, firestore } = useFirebase();
  const user = auth().currentUser;

  const [lists, setLists] = React.useState([]);
  const [genericLists, setGenericLists] = React.useState([]);
  const [dailyLists, setDailyLists] = React.useState([]);
  const [renderedLists, setRenderedLists] = React.useState<LayoutT | void>();

  const handleAddNewList = (list) => {
    setLists((pLists) => [
      ...pLists,
      list,
    ]);
  };

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
            handleAddNewList({
              ...doc.data(),
              id: doc.id,
            });
          });
        })
        .catch((err) => {
          console.error(err);
        });

      // Get user preference data
      firestore().collection('users').doc(user.uid).get()
        .then((snapshot) => {
          const data = snapshot.data();
          console.log(data);
          if (!data) {
            const initialLayout = [
              {
                data: [''],
              },
            ];
            firestore().collection('users').doc(user.uid).set({
              layout: initialLayout,
            })
              .then(() => {
                setRenderedLists(initialLayout);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            console.log('setRenderedLists', data.layout);
            setRenderedLists(data.layout);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (user && renderedLists) {
      firestore().collection('users').doc(user.uid).update({
        layout: renderedLists,
      });
    }
  }, [user, renderedLists]);

  return (
    <>
      <DailyLists
        handleAddNewList={handleAddDailyList}
        dailyLists={dailyLists}
      />
      <GenericLists
        handleAddNewList={handleAddGenericList}
        genericLists={genericLists}
      />
    </>
  );
};

export default Main;
