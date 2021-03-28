// @flow
import * as React from 'react';

import type { ListT } from '@core/types';

import NewList from './NewList';

type Props = {
  handleAddNewListItem: (list: ListT) => void,
};

const Options = ({
  handleAddNewListItem,
}: Props): React.Node => (
  <>
    <NewList addList={handleAddNewListItem} />
  </>
);

export default Options;
