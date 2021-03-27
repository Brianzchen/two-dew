// @flow
import * as React from 'react';

import type { ListT } from '../..';

type Props = {
  ...ListT,
};

const ListTodo = ({
  id,
  name,
}: Props): React.Node => (
  <div>
    {name}
    List todo
    <div>
      {id}
    </div>
  </div>
);

export default ListTodo;
