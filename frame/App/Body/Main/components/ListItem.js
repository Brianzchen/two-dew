// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { Box, Button, Icon } from '@pkgs/components';
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

  const updatePriority = () => {
    firebase.firestore().collection('lists').doc(listId).collection('items')
      .doc(id)
      .update({
        priority: !priority,
      });
  };

  const styles = {
    container: {
      display: 'flex',
      borderTop: '1px solid #cccccc',
      textDecoration: completed ? 'line-through' : 'initial',
      backgroundColor: priority ? 'grey' : undefined,
    },
    itemName: {
      flexGrow: 3,
    },
  };

  return (
    <Box
      style={styles.container}
    >
      <Box style={styles.itemName}>
        {name}
      </Box>
      <Button
        onClick={markCompleted}
      >
        <Icon
          icon="check"
        />
      </Button>
      {completed && (
        <Button
          onClick={deleteItem}
        >
          <Icon
            icon="delete"
          />
        </Button>
      )}
      {!completed && (
        <Button
          onClick={updatePriority}
        >
          <Icon icon={priority ? 'flag-variant' : 'flag-variant-outline'} />
        </Button>
      )}

    </Box>
  );
};

export default ListItem;
