// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { Icon } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  listId: string,
  day?: number,
  addItem?: (item: ListItemT) => void,
};

const AddItem = ({
  listId,
  day,
  addItem,
}: Props): React.Node => {
  const { firestore } = useFirebase();

  const [value, setValue] = React.useState('');
  const [priority, setPriority] = React.useState(false);

  const itemPriority = priority;

  const addNewTodoItem = () => {
    const newItem = {
      name: value,
      description: '',
      completed: false,
      day: day ?? new Date().getDay(),
      priority: itemPriority,
    };

    firestore().collection('lists').doc(listId).collection('items')
      .add(newItem)
      .then((doc) => {
        addItem && addItem(({
          ...newItem,
          id: doc.id,
        }));
        setValue('');
        setPriority(false);
      });
  };

  const markPriority = () => {
    if (priority === true) {
      setPriority(false);
    } else {
      setPriority(true);
    }
  };

  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      <input
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <button
        type="button"
        onClick={addNewTodoItem}
        disabled={value.length === 0}
      >
        Add New Item
      </button>
      <button
        type="button"
        disabled={value.length === 0}
        onClick={markPriority}
      >
        {priority ? <Icon icon="flag-variant" /> : <Icon icon="flag-variant-outline" />}
      </button>

    </div>
  );
};

export default AddItem;
