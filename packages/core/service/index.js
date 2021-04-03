// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { useFirebase } from '@pkgs/utils';

export const useGetListItems = (
  listId: string,
  callback: (items: Array<ListItemT>) => void,
  options?: {
    completed?: boolean,
    ...
  } = {},
) => {
  const { firestore } = useFirebase();

  React.useEffect(() => {
    const itemCollection = (() => firestore().collection('lists').doc(listId).collection('items'))();

    const updateItems = (snapshot) => {
      const newItems = [];
      snapshot.forEach((shot) => {
        newItems.push({
          ...shot.data(),
          id: shot.id,
        });
      });
      callback(newItems);
    };

    let unsubscribe;

    if (!options.completed) {
      unsubscribe = itemCollection.where('completed', '==', false).onSnapshot((snapshot) => {
        updateItems(snapshot);
      });
    } else {
      unsubscribe = itemCollection.onSnapshot((snapshot) => {
        updateItems(snapshot);
      });
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [listId, options.completed]);
};
