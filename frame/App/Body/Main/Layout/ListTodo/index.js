// @flow
import * as React from 'react';

import { useFirebase } from '@pkgs/utils';

import type { ListT } from '../..';
import type { ListItemT } from '../components/AddItem';

import AddItem from '../components/AddItem';

type Props = {
  ...ListT,
};

const ListTodo = ({
  id,
  name,
}: Props): React.Node => {
  const firebase = useFirebase();

  const [items, setItems] = React.useState<Array<ListItemT>>([]);

  React.useEffect(() => {
    firebase.firestore().collection('lists').doc(id).collection('items')
      .onSnapshot((snapshot) => {
        const newItems = [];
        snapshot.forEach((shot) => {
          newItems.push({
            ...shot.data(),
            id: shot.id,
          });
        });
        setItems(newItems);
      });
  }, []);

  return (
    <div>
      {name}
      List todo
      <div>
        {id}
      </div>
      <AddItem
        listId={id}
      />
      {items.map((o) => (
        <div
          key={o.id}
        >
          {o.name}
        </div>
      ))}
    </div>
  );
};

export default ListTodo;
