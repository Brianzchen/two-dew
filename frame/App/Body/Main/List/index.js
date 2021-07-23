// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { Box } from '@pkgs/components';

import type { LayoutT } from '..';
// import DailyTodo from './DailyTodo';
// import DeleteList from './DeleteList';
// import NewList from './NewList';
// import ListTodo from './ListTodo';

type Props = {
  handleAddNewList: (list: ListT) => void,
  lists: Array<ListT>,
  renderedLists: LayoutT,
  setRenderedLists: ((LayoutT) => LayoutT) => void,
  onListDeletion: (listId: string) => void,
};

const Layout = ({
  handleAddNewList,
  lists,
  renderedLists,
  setRenderedLists,
  onListDeletion,
}: Props): React.Node => {
  const [openNewList, setOpenNewList] = React.useState(false);
  return (
    <Box
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {console.log('Handle Add New List', handleAddNewList)}
      {console.log('Lists', lists)}
    </Box>
  );
};

export default Layout;
