// @flow
import * as React from 'react';
import { range } from 'lodash';

import { useGetListItems } from '@core/service';
import { Box } from '@pkgs/components';

import type { ListT } from '../..';
import AddItem from '../components/AddItem';

import Column from './Column';

type Props = {
  ...ListT,
};

const DailyTodo = ({
  id,
  name,
}: Props): React.Node => {
  const [items, setItems] = React.useState([]);

  const mapItemsToDays = range(0, 7).map((o) => {
    const dayItems = items.filter((i) => i.day === o);
    return {
      day: o,
      items: dayItems,
    };
  });

  useGetListItems(id, (newItems) => {
    setItems(newItems);
  });

  return (
    <div>
      {name}
      Daily todo list
      <div>
        {id}
      </div>
      <Box
        style={{
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {/** this range should change based on responsive design */}
        {mapItemsToDays.map((o) => (
          <Column
            key={o.day}
            day={o.day}
          >
            <AddItem
              listId={id}
              day={o.day}
            />
            {o.items.map((i) => (
              <div
                key={i.id}
              >
                {i.name}
              </div>
            ))}
          </Column>
        ))}
      </Box>
    </div>
  );
};

export default DailyTodo;
