// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { Box } from '@pkgs/components';

import ListSwitcher from './ListSwitcher';
import DailyTodo from './DailyTodo';

type Props = {
  onListDeletion: (listId: string) => void,
  handleAddNewList: (list: ListT) => void,
  dailyLists: Array<ListT>,
};

const DailyLists = ({
  onListDeletion,
  handleAddNewList,
  dailyLists,
}: Props): React.Node => {
  const [listName, setListName] = React.useState(dailyLists[0]?.name);
  const list = dailyLists.filter((o) => o.name === listName)[0];
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [showFlagged, setShowFlagged] = React.useState(false);

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
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        onListDeletion={onListDeletion}
        showFlagged={showFlagged}
        setShowFlagged={setShowFlagged}
      />
      {listName && dailyLists && (
        <DailyTodo
          showCompleted={showCompleted}
          showFlagged={showFlagged}
          {...list}
        />
      )}
    </Box>
  );
};

export default DailyLists;
