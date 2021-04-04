// @flow
import * as React from 'react';

import type { ListT } from '@core/types';

import type { LayoutT } from '..';
import NewList from './NewList';
import SelectLayout from './SelectLayout';

type Props = {
  handleAddNewList: (list: ListT) => void,
  setRenderedLists: (LayoutT) => void,
};

const Options = ({
  handleAddNewList,
  setRenderedLists,
}: Props): React.Node => (
  <>
    <NewList addList={handleAddNewList} />
    <SelectLayout setRenderedLists={setRenderedLists} />
  </>
);

export default Options;
