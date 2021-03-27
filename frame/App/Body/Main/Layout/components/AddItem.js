// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { useFirebase } from '@pkgs/utils';

type Props = {
  listId: string,
  addItem?: (item: ListItemT) => void,
};

const AddItem = ({
  listId,
  addItem,
}: Props): React.Node => {
  const { firestore } = useFirebase();

  const [value, setValue] = React.useState('');

  const addNewTodoItem = () => {
    const newItem = {
      name: value,
      description: '',
      completed: false,
      day: new Date().getDay(),
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
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <button
        type="button"
        onClick={addNewTodoItem}
      >
        Add New Item
      </button>
    </div>
  );
};

export default AddItem;
