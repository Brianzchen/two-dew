// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { useFirebase } from '@pkgs/utils';

export const useGetListItems = (
  listId: string,
  callback: (items: Array<ListItemT>) => void,
) => {
  const { firestore } = useFirebase();

  React.useEffect(() => {
    firestore().collection('lists').doc(listId).collection('items')
      .onSnapshot((snapshot) => {
        const newItems = [];
        snapshot.forEach((shot) => {
          newItems.push({
            ...shot.data(),
            id: shot.id,
          });
        });
        callback(newItems);
      });
  }, [listId]);
};