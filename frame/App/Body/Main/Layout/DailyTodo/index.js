// @flow
import * as React from 'react';

import type { ListT } from '../..';

type Props = {
  ...ListT,
};

const DailyTodo = ({
  id,
  name,
}: Props): React.Node => (
  <div>
    {name}
    Daily todo list
    <div>
      {id}
    </div>
  </div>
);

export default DailyTodo;
