// @flow
import * as React from 'react';

import type { ListT } from '@core/types';

import type { LayoutT } from '..';
import NewList from './NewList';
import SelectLayout from './SelectLayout';

type Props = {
  handleAddNewListItem: (list: ListT) => void,
  setRenderedLists: (LayoutT) => void,
};

const Options = ({
  handleAddNewListItem,
  setRenderedLists,
}: Props): React.Node => (
  <>
    <NewList addList={handleAddNewListItem} />
    <SelectLayout setRenderedLists={setRenderedLists} />
  </>
);

export default Options;
