// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { Box } from '@pkgs/components';

import ListSwitcher from './ListSwitcher';
import DailyTodo from './DailyTodo';

type Props = {
  handleAddNewList: (list: ListT) => void,
  dailyLists: Array<ListT>,
};

const DailyLists = ({
  handleAddNewList,
  dailyLists,
}: Props): React.Node => {
  const [listName, setListName] = React.useState(dailyLists[0]?.name);
  const list = dailyLists.filter((o) => o.name === listName)[0];

  return (
    <Box
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50%',
      }}
    >
      <ListSwitcher
        addList={handleAddNewList}
        lists={dailyLists}
        setName={setListName}
        name={listName}
      />
      <DailyTodo
        {...list}
      />
    </Box>
  );
};

export default DailyLists;
