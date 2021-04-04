// @flow
import * as React from 'react';

import { useGetListItems } from '@core/service';
import type { ListT } from '@core/types';

import AddItem from '../components/AddItem';
import ListItem from '../components/ListItem';

type Props = {
  ...ListT,
};

const ListTodo = ({
  id,
}: Props): React.Node => {
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [items, setItems] = React.useState([]);

  useGetListItems(id, (newItems) => {
    setItems(newItems);
  }, { completed: showCompleted });

  return (
    <div>
      <div>
        <input
          value={showCompleted}
          onChange={() => {
            setShowCompleted((pShowCompleted) => !pShowCompleted);
          }}
          type="checkbox"
        />
        show completed
      </div>
      <AddItem
        listId={id}
      />
      {items.map((o) => (
        <ListItem
          key={o.id}
          {...o}
          listId={id}
        />
      ))}
    </div>
  );
};

export default ListTodo;
