// @flow
import * as React from 'react';

import type { ListItemT } from '@core/types';
import { Box, Icon } from '@pkgs/components';
import { useFirebase } from '@pkgs/utils';

type Props = {
  ...ListItemT,
  listId: string,
};

const ListItem = ({
  id,
  name,
  completed,
  listId,
}: Props): React.Node => {
  const firebase = useFirebase();

  const markCompleted = () => {
    firebase.firestore().collection('lists').doc(listId).collection('items')
      .doc(id)
      .update({
        completed: true,
      });
  };

  const styles = {
    container: {
      borderTop: '1px solid #cccccc',
      textDecoration: completed ? 'line-through' : 'initial',
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
    </Box>
  );
};

export default ListItem;
