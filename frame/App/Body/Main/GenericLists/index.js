// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { Box } from '@pkgs/components';

import ListSwitcher from './ListSwitcher';
import ListTodo from './ListTodo';

type Props = {
  handleAddNewList: (list: ListT) => void,
  genericLists: Array<ListT>,
};

const GenericLists = ({
  handleAddNewList,
  genericLists,
}: Props): React.Node => (
  <Box
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <ListSwitcher
      addList={handleAddNewList}
    />
    <Box
      style={{
        display: 'flex',
      }}
    >
      {genericLists.map((listData) => {
        const list = genericLists.filter((o) => o.name === listData.name)[0];
        return (
          <div
            key={listData.id}
          >
            <ListTodo
              listName={listData.name}
              {...list}
            />
          </div>
        );
      })}
    </Box>
  </Box>
);

export default GenericLists;
