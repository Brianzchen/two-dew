// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { Box, Icon } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  ...ListItemT,
  listId: string,
  priority: boolean,
};

const ListItem = ({
  id,
  name,
  completed,
  priority,
  listId,
}: Props): React.Node => {
  const firebase = useFirebase();

  const markCompleted = () => {
    firebase.firestore().collection('lists').doc(listId).collection('items')
      .doc(id)
      .update({
        completed: !completed,
      });
  };

  const deleteItem = () => {
    firebase.firestore().collection('lists').doc(listId).collection('items')
      .doc(id)
      .delete();
  };

  const styles = {
    container: {
      borderTop: '1px solid #cccccc',
      textDecoration: completed ? 'line-through' : 'initial',
      backgroundColor: priority ? 'grey' : null,
    },
  };

  return (
    <Box
      style={styles.container}
    >
      {name}
      <button
        type="button"
        onClick={markCompleted}
      >
        <Icon
          icon="check"
        />
      </button>
      {completed && (
        <button
          type="button"
          onClick={deleteItem}
        >
          <Icon
            icon="delete"
          />
        </button>
      )}
      {priority ? <Icon icon="flag-variant" /> : null}

    </Box>
  );
};

export default ListItem;
