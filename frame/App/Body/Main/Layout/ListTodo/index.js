// @flow
import * as React from 'react';

import { useGetListItems } from '@core/service';

import type { ListT } from '../..';

import AddItem from '../components/AddItem';

type Props = {
  ...ListT,
};

const ListTodo = ({
  id,
  name,
}: Props): React.Node => {
  const [items, setItems] = React.useState([]);

  useGetListItems(id, (newItems) => {
    setItems(newItems);
  });

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
