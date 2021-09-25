// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { Button, Icon } from '@pkgs/components';
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

  const addNewTodoItem = () => {
    const newItem = {
      name: value,
      description: '',
      completed: false,
      day: day ?? new Date().getDay(),
      priority,
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

  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      <input
        value={value}
        style={{
          width: '100%',
        }}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <Button
        onClick={addNewTodoItem}
        disabled={value.length === 0}
      >
        Add New Item
      </Button>
      <Button
        disabled={value.length === 0}
        onClick={() => {
          setPriority((pPriority) => !pPriority);
        }}
      >
        <Icon icon={priority ? 'flag-variant' : 'flag-variant-outline'} />
      </Button>

    </div>
  );
};

export default AddItem;
