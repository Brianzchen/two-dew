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
    firestore().collection('lists').doc(listId).collection('items')
      .onSnapshot((snapshot) => {
        const newItems = [];
        snapshot.forEach((shot) => {
          const data = shot.data();
          if (!options.completed && data.completed) return;

          newItems.push({
            ...shot.data(),
            id: shot.id,
          });
        });
        callback(newItems);
      });
  }, [listId, options.completed]);
};
