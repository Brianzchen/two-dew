// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
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

  const addNewTodoItem = () => {
    const newItem = {
      name: value,
      description: '',
      completed: false,
      day: day ?? new Date().getDay(),
    };

    firestore().collection('lists').doc(listId).collection('items')
      .add(newItem)
      .then((doc) => {
        addItem && addItem(({
          ...newItem,
          id: doc.id,
        }));
        setValue('');
      });
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
    </div>
  );
};

export default AddItem;
