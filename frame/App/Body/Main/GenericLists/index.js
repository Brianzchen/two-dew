// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { Box } from '@pkgs/components';

import ListHeaderActions from './ListHeaderActions';
import ListTodo from './ListTodo';

type Props = {
  handleAddNewList: (list: ListT) => void,
  genericLists: Array<ListT>,
  onListDeletion: (listId: string) => void,
};

const GenericLists = ({
  handleAddNewList,
  genericLists,
  onListDeletion,
}: Props): React.Node => (
  <Box
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <ListHeaderActions
      addList={handleAddNewList}
    />
    <Box
      style={{
        display: 'flex',
        overflow: 'auto',
      }}
    >
      {genericLists.map((listData) => {
        const list = genericLists.filter((o) => o.name === listData.name)[0];
        return (
          <div
            key={listData.id}
          >
            <ListTodo
              onListDeletion={onListDeletion}
              {...list}
            />
          </div>
        );
      })}
    </Box>
  </Box>
);

export default GenericLists;
